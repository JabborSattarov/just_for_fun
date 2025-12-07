import { Module } from "@nestjs/common";
import { ClientConroller } from "./clients.controller";
import { ClientService } from "./clients.service";
import { Client, ClientSchema } from "src/schemas/clients.schemas";
import { Permissions, PermissionSchema } from "src/schemas/permissions.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { SendMail } from "src/utils/mailer";
import { GenerateToken, OneTimeCode } from "src/utils";
import { GenerateLoginPassword } from "src/utils/generate-login";
import { HashPassword } from "src/utils/hash-password";
import { CheckRoleGuard } from "src/guards/check-role.guard";

@Module({
   imports: [
      MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Permissions.name, schema: PermissionSchema }
      ]),
   ],
   providers: [
      ClientService, 
      GenerateLoginPassword,
      SendMail,
      HashPassword,
      OneTimeCode,
      GenerateToken,
   ],
   controllers: [ClientConroller],
   exports: []
})
export class ClientModule { }