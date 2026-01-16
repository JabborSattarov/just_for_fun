import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/schemas/product.schemas";
import { GenerateToken, OneTimeCode } from "src/utils";
import { Client, ClientSchema } from "src/schemas/clients.schemas";


@Module({
   imports:[
      MongooseModule.forFeature([
         { name: Client.name, schema: ClientSchema },
         { name: Product.name, schema: ProductSchema },
      ])
   ],
   controllers:[
      ProductController
   ],
   providers: [
      ProductService,
      GenerateToken,
      OneTimeCode,
   ]
})
export class ProductModule {}