import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client, ClientSchema } from "src/schemas/clients.schemas";

export class GenerateLoginPassword {
   constructor(@InjectModel(Client.name) private readonly clientSchema: Model<Client>) { }

   private generate(length: number) {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let hash = "";
      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * charset.length);
         hash += charset[randomIndex];
      }
      return hash;
   }

   async generateLoginPassword(loginLength: number, passwordLength: number) {
      let login = this.generate(loginLength);
      let password = this.generate(passwordLength);
      const existLogin = await this.clientSchema.findOne({ user_login: login });
      if (!existLogin) {
         login = this.generate(length)
         password = this.generate(length)
      }
      return { login, password }
   }


}