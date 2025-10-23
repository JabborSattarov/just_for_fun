import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client, } from "src/schemas/clients.schemas";
import { OneTimeCode } from "src/utils";
import { HashPassword } from "src/utils/hash-password";

@Injectable()
export class AdminSeederService implements OnModuleInit {

   constructor(
      @InjectModel(Client.name) private readonly clientSchema: Model<Client>
   ) { }

   async onModuleInit() {

      const hashPassword = new HashPassword();
      const oneTimeCode = new OneTimeCode();
      
      const access_token_key = oneTimeCode.generateOneTimeCode(32)
      const refresh_token_key = oneTimeCode.generateOneTimeCode(32)
      const adminSchema = {
         user_firstname: "Admin",
         user_lastname: "Admin",
         user_login: "admin_login",
         user_password: hashPassword.hashPassword("admin_password"),
         user_email: "admin@gmail.com",
         user_phone: "+998992325689",
         role: "admin",
         status: true,
         secret_key_access: access_token_key,
         secret_key_refresh: refresh_token_key,
      }

      const existsAdmin = await this.clientSchema.findOne({ role: "admin", status: true });

      if (!existsAdmin) {
         await this.clientSchema.create(adminSchema)
         console.log("admin is created !")
      } else {
         console.log("Admin is exists !");
      }

   }


}