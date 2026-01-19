import { Module } from "@nestjs/common";
import { SalesController } from "./sales.controller";
import { SalesService } from "./sales.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Client, ClientSchema } from "src/schemas/clients.schemas";
import { Sales, SalesSchema } from "src/schemas/buy_sale_schema";
import { GenerateToken, OneTimeCode } from "src/utils";

@Module({
   imports: [
            MongooseModule.forFeature([
               { name: Client.name, schema: ClientSchema },
               { name: Sales.name, schema: SalesSchema },
            ])
   ],
   controllers: [
      SalesController
   ],
   providers: [
      SalesService,
      GenerateToken,
      OneTimeCode
   ]
})

export class SalesModule {}