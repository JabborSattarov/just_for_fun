import { Module } from "@nestjs/common";
import { ContractController } from "./contract.controller";
import { ContractService } from "./contract.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Contract, ContractSchema } from "src/schemas/contract.schemas";
import { Product, ProductSchema } from "src/schemas/product.schemas";

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Contract.name, schema: ContractSchema },
         { name: Product.name, schema: ProductSchema },
      ])
   ],
   controllers: [ContractController],
   providers: [
      ContractService
   ]
})
export class ContractModule { }