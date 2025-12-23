import { MailerService } from "@nestjs-modules/mailer";
import { SendCodeType, SendLoginPasswordType } from "src/types";

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

   async sendCode (payload:SendCodeType ) {
      return this.#_mailerService.sendMail({
         to: payload.email,
         subject: payload.message,
         template: "code",
         context: {
            name: `${payload.user_firstname} ${payload.user_lastname}`,
            code: payload.code,
            supportUrl: 'http://localhost:9000/support'
         }
      })
   }
}