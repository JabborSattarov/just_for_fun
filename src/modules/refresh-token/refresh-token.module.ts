import { Module } from "@nestjs/common";
import { RefershTokenService } from "./refresh-token.service";
import { RefreshTokenController } from "./refresh-token.controller";
import { GenerateToken, HashingId, OneTimeCode } from "src/utils";
import { MongooseModule } from "@nestjs/mongoose";
import { Client, ClientSchema } from "src/schemas/clients.schemas";

@Module({
   imports:[
      MongooseModule.forFeature([
         {name: Client.name, schema: ClientSchema }
      ])
   ],
   providers:[
      RefershTokenService,
      OneTimeCode,
      GenerateToken,
      HashingId,
   ],
   controllers:[RefreshTokenController]
})
export class RefershTokenModule {}