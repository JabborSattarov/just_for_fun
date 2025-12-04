import { HashingId } from './../../utils/hash-id';

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { BadRequestException, ConflictException } from "src/exceptions";
import { ClientCreateRequest, ClientCreateResponse, ClientDeleteRequestInterface, CreateClientInterface, CreatePermissionInterface, CustomeRequestInterface } from "src/interfaces";
import { Client } from "src/schemas/clients.schemas";
import { Permissions } from "src/schemas/permissions.schema";
import { SendLoginPasswordType } from "src/types";
import { GenerateLoginPassword, GenerateToken, HashPassword, OneTimeCode, SendMail } from 'src/utils';




@Injectable()
export class ClientService {

   constructor(
      @InjectModel(Client.name) private readonly clientSchema: Model<Client>,
      @InjectModel(Permissions.name) private readonly permissionSchema: Model<Permissions>,
      private generateLoginPassword: GenerateLoginPassword,
      private hashPassword: HashPassword,
      private oneTimeCode: OneTimeCode,
      private generateToken: GenerateToken,
      private sendMail: SendMail
   ) { }


   async create(data: ClientCreateRequest, req: CustomeRequestInterface): Promise<ClientCreateResponse> {
      let {
         user_email,
         role
      } = data;

      const checkUnique = await this.clientSchema.findOne({ user_email, status: true });
      if (checkUnique) {
         throw new ConflictException("", "user must be unique");
      }

      const { login, password } = await this.generateLoginPassword.generateLoginPassword(10, 10);

      const hashedPassword = this.hashPassword.hashPassword(password)



      const newClientData: CreateClientInterface = {
         ...data,
         user_login: login,
         user_password: hashedPassword,
         secret_key_access: this.oneTimeCode.generateOneTimeCode(32),
         secret_key_refresh: this.oneTimeCode.generateOneTimeCode(32),

      }

      const newClient = await this.clientSchema.create(newClientData);

      if (role === "user") {
         const adminPermissionData: CreatePermissionInterface = {
            edit_user: false,
            edit_product: false,
            users: newClient,
         }
         await this.permissionSchema.create(adminPermissionData);
      } else if (role == "manager") {
         const adminPermissionData: CreatePermissionInterface = {
            edit_user: false,
            edit_product: true,
            users: newClient,
         }
         await this.permissionSchema.create(adminPermissionData);
      }



      const loginData: SendLoginPasswordType = {
         user_firstname: newClient.user_firstname,
         user_lastname: newClient.user_lastname,
         email: newClient.user_email,
         message: "Your login and password information !",
         login: newClient.user_login,
         password: password,

      }

      console.log("data", loginData)
      await this.sendMail.sendLoginMail(loginData)


      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "Login and password sended to your email.",
         ...tokens
      }
   }

   async delete(param: ClientDeleteRequestInterface, req: CustomeRequestInterface): Promise<ClientCreateResponse> {
      if (!param.id ) {
         throw new BadRequestException("", "id is required !");
      }
      if (!mongoose.isValidObjectId(param.id)) {
         throw new BadRequestException("", "id must be objectId !");
      }

      await this.clientSchema.updateOne({_id: new mongoose.Types.ObjectId(param.id), status: true}, {status: false});

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "User successfully deleted !",
         ...tokens
      }
   }
}