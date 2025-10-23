import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendLoginPasswordType } from "src/types";
@Injectable()
export class SendMail {
   readonly #_mailerService: MailerService
   constructor(mailerService: MailerService) {
      this.#_mailerService = mailerService
   }

   async sendLoginMail (payload: SendLoginPasswordType) {
      return this.#_mailerService.sendMail({
         to: payload.email,
         subject: payload.message,
         template: "login",
         context: {
            name : `${payload.user_firstname} ${payload.user_lastname}`,
            login: payload.login,
            password: payload.password,
            loginUrl: 'http://localhost:9000/auth/login'
         }
      }) 
   }
}