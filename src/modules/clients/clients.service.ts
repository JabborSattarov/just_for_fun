import { HashingId } from './../../utils/hash-id';

import { Get, Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { BadRequestException, ConflictException } from "src/exceptions";
import { NotFoundException } from 'src/exceptions/not-found.exception';
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
      if (!param.id) {
         throw new BadRequestException("", "id is required !");
      }
      if (!mongoose.isValidObjectId(param.id)) {
         throw new BadRequestException("", "id must be objectId !");
      }

      await this.clientSchema.updateOne({ _id: new mongoose.Types.ObjectId(param.id), status: true }, { status: false });

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "User successfully deleted !",
         ...tokens
      }
   }

   async getOne(param: ClientDeleteRequestInterface, req: CustomeRequestInterface): Promise<ClientCreateResponse> {
      console.log("keldi !");
      
      if (!param && !param.id) {
         throw new BadRequestException("", "id is required !");
      }
      if (!mongoose.isValidObjectId(param.id)) {
         throw new BadRequestException("", "id must be objectId !");
      }

      const founded = await this.clientSchema.findOne({ _id: param.id, status: true }).lean();
      
      let foundedClient: object = {};
      for (const key in founded) {         
         if (["_id" ,"user_firstname" ,"user_lastname", "user_email", "user_phone"].includes(key)) {
            foundedClient[key] = founded[key];
         }

      }
      if (!founded) {
         throw new NotFoundException("", "user is not found")
      }

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)
      return {
         status: 200,
         message: "OK",
         data: foundedClient,
         ...tokens
      }
   }

   async getAll( req: CustomeRequestInterface):Promise<ClientCreateResponse>{
      
      let founded: Array<object>;
      let foundedClient: Array<object> = [];

      if (req.decode.role == "admin") {
         founded = await this.clientSchema.find({role: {$in:["manager", "user"]}, status: true}).lean();
      }
      if (req.decode.role == "manager") {
         founded = await this.clientSchema.find({ role: { $in: ["user"] }, status: true}).lean();
      }
      
      for (const client of founded) {
         let redyClient = {}
         for (const key in client) {
            if (["_id", "user_firstname", "user_lastname", "user_email", "user_phone"].includes(key)) {
               redyClient[key] = client[key];
            }
         }
         foundedClient.push(redyClient)
      }

      console.log("Redy clinet",foundedClient);
      

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)
      return {
         status: 200,
         message: "OK",
         data: foundedClient,
         ...tokens
      } 
   }
}