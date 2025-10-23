import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as path from "path"


const SMTP_USR = process.env.SMTP_USR ? String(process.env.SMTP_USR) : "sattarovjabboro4@gmail.com"
const SMTP_PWD = process.env.SMTP_PWD ? String(process.env.SMTP_PWD) : "getbclujgbrfmyvr"

console.log(SMTP_USR);
console.log(SMTP_PWD);

export const mailerModuleOptions: MailerOptions = {
   transport : { 
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
         user: SMTP_USR,
         pass: SMTP_PWD,
      }, 
   },
   defaults: {
      from: `"No Reply" <${SMTP_USR}>`,
   },
   template: {
      dir: path.join(process.cwd(), 'src', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
         strict: true,
      },
   }
}


// isProduction ? path.join(process.cwd(), 'dist', 'templates') : path.join(process.cwd(), 'src', 'templates')