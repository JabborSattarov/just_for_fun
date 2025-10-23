import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Client } from 'src/schemas/clients.schemas';
import { Model } from 'mongoose';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exaption';
import { GenerateToken } from 'src/utils';
import { HashPassword } from 'src/utils/hash-password';
import { loginRequest, loginResponse } from 'src/interfaces';
@Injectable()
export class authService {
   constructor(
      @InjectModel(Client.name) private readonly clientSchema: Model<Client>,
      private readonly generateToken: GenerateToken,
      private readonly hashPassword: HashPassword,

   ) { }

   async login(body: loginRequest): Promise<loginResponse> {
      let { user_login, user_password } = body;

      const findUser = await this.clientSchema.findOne({ user_login, status: true });

      let verifyedPassword = this.hashPassword.verifyPassword(findUser.user_password, user_password)

      if (!findUser || !verifyedPassword) {
         throw new UnauthorizedException("", "this user is not exists",);
      } else {
         const SECERT_KEY = process.env.AES_SECRET_KEY
         const tokens = await this.generateToken.signPayload({ id: findUser.id, role: findUser.role }, SECERT_KEY, true)

         let response: loginResponse = {
            status: 200,
            message: "loged in",
            ...tokens

         }
         return response
      }
   }
}