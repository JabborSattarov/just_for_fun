import { CheckAuthCodeRequestInterface, CheckAuthCodeResponseInterface, SendAuthCodeRequestInterface, SendAuthCodeResponseInterface } from 'src/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Client } from 'src/schemas/clients.schemas';
import { Model } from 'mongoose';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exaption';
import { GenerateLoginPassword, GenerateToken, OneTimeCode, SendMail } from 'src/utils';
import { HashPassword } from 'src/utils/hash-password';
import { loginRequestInterface, loginResponseInterface } from 'src/interfaces';
import { SendCodeType } from 'src/types';

@Injectable()
export class authService {
   private readonly SECERT_KEY = process.env.AES_SECRET_KEY
   constructor(
      @InjectModel(Client.name) private readonly clientSchema: Model<Client>,
      private readonly generateToken: GenerateToken,
      private readonly hashPassword: HashPassword,
      private readonly sendMail: SendMail,
      private readonly oneTimeCode: OneTimeCode,
      private readonly generateLoginPassword: GenerateLoginPassword

   ) { }

   async login(body: loginRequestInterface): Promise<loginResponseInterface> {
      let { user_login, user_password } = body;

      const findUser = await this.clientSchema.findOne({ user_login, status: true });
      if (!findUser) {
         throw new UnauthorizedException("", "incorrect login !",);
      }

      let verifyedPassword = this.hashPassword.verifyPassword(findUser.user_password, user_password)

      if (!verifyedPassword) {
         throw new UnauthorizedException("", "incorrect password !",);
      }

      const tokens = await this.generateToken.signPayload({ id: findUser.id, role: findUser.role }, this.SECERT_KEY, true)

      let response: loginResponseInterface = {
         status: 200,
         message: "loged in",
         id: findUser.id,
         ...tokens,

      }
      return response

   }

   async sendAuthCode(body: SendAuthCodeRequestInterface): Promise<SendAuthCodeResponseInterface> {
      const { email } = body;

      const findUser = await this.clientSchema.findOne({ user_email: email, status: true });

      console.log(findUser);
      
      if (!findUser) {
         throw new UnauthorizedException("", "user is not found !");
      }
      const code = this.oneTimeCode.generateAuthCode(4);
      findUser.code = code;
      await findUser.save();

      const payload: SendCodeType = {
         user_firstname: findUser.user_firstname,
         user_lastname: findUser.user_lastname,
         email: findUser.user_email,
         message: "Your Code",
         code

      }

      await this.sendMail.sendCode(payload);


      return { message: "Sended to your email" }
   }


   async checkAuthCode(body: CheckAuthCodeRequestInterface): Promise<CheckAuthCodeResponseInterface> {

      const { email, code } = body;

      const findUser = await this.clientSchema.findOne({ user_email: email, status: true, code });
      if (!findUser) {
         throw new UnauthorizedException("", "Unauthorized !")
      }
      const { login, password } = await this.generateLoginPassword.generateLoginPassword(10, 10);
      findUser.user_login = login,
         findUser.user_password = this.hashPassword.hashPassword(password)
      findUser.code = null,
         await findUser.save()

      await this.sendMail.sendLoginMail({ email, user_firstname: findUser.user_firstname, user_lastname: findUser.user_lastname, login, password, message: "this is your login password take care it !" })

      const response: CheckAuthCodeResponseInterface = {
         message: "Your login passowrd sended to your email",
      }
      return response
   }
}

