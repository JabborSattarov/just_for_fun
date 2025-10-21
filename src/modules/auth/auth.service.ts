import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { loginRequest, loginResponse } from "./interfaces";
import { Client } from 'src/schemas/clients.schemas';
import { Model } from 'mongoose';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exaption';
import { GenerateToken } from 'src/utils';
import { GenerateLoginPassword } from 'src/utils/generate-login';
import { HashPassword } from 'src/utils/hash-password';

@Injectable()
export class authService {
   constructor(@InjectModel(Client.name) private readonly clientSchema: Model<Client>) { }
   async login(body: loginRequest): Promise<loginResponse> {
      let { user_login, user_password } = body;
      let hashPassword = new HashPassword();
      const findUser = await this.clientSchema.findOne({ user_login, status: true });
            
      let verifyedPassword = hashPassword.verifyPassword(findUser.user_password, user_password)
      
      if (!findUser || !verifyedPassword ) {
         throw new UnauthorizedException("", "this user is not exists",);
      } else {
         const generateToken = new GenerateToken(this.clientSchema)
         const SECERT_KEY = process.env.AES_SECRET_KEY
         const { accessToken, hash } = await generateToken.signPayload({ id: findUser.id, role: findUser.role}, SECERT_KEY, true)

         let response: loginResponse = {
            status: 200,
            message: "loged in",
            access_token: accessToken,
            hash: hash
         }
         return response
      }
   }
}