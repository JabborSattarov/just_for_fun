import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client, } from "src/schemas/clients.schemas";

@Injectable()
export class AdminSeederService implements  OnModuleInit {

   constructor(
      @InjectModel(Client.name) private readonly clientSchema: Model<Client>
   ){}

   async onModuleInit() {
      const adminSchema  = {
         user_firstname: "Admin",
         user_lastname:"Admin",  
         user_login: "admin_login",
         user_password: "admin_password",
         user_email:"admin@gmail.com",
         user_phone:"+998992325689",
         role: "admin",
         status: true
      }

      const existsAdmin = await this.clientSchema.findOne({role: "admin", status: true});

      if (!existsAdmin) {
         await this.clientSchema.create(adminSchema)
         console.log("admin is created !")
      }
      console.log("Admin is exists !");
      
   }
   

}