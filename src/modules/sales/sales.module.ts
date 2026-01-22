import { Module } from "@nestjs/common";
import { SalesController } from "./sales.controller";
import { SalesService } from "./sales.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Client, ClientSchema } from "src/schemas/clients.schemas";
import { Sales, SalesSchema } from "src/schemas/buy_sale_schema";
import { GenerateToken, OneTimeCode } from "src/utils";
import { ProductState, ProductStateSchema } from "src/schemas/produt_state.schema";

@Module({
   imports: [
            MongooseModule.forFeature([
               { name: Client.name, schema: ClientSchema },
               { name: Sales.name, schema: SalesSchema },
               { name: ProductState.name, schema: ProductStateSchema },
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