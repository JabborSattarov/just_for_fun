import { Global, Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Client, ClientSchema } from "src/schemas/clients.schemas";
import { GenerateToken, HashPassword } from "src/utils";


@Module({
   imports:[
      MongooseModule.forFeature([
         {name: Client.name, schema: ClientSchema}
      ])
   ],
   providers:[
      authService,
      GenerateToken,
      HashPassword
   ],
   controllers:[authController]
})
export class AuthModule {}