import { Module } from "@nestjs/common";
import { CategoryController } from "./cateogryes.controller";
import { CategoryService } from "./categoryes.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "src/schemas/category.schemas";
import { GenerateLoginPassword, GenerateToken, OneTimeCode } from "src/utils";
import { Client, ClientSchema } from "src/schemas/clients.schemas";
import { ClientModule } from "../clients/clients.module";

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Client.name, schema: ClientSchema },
         { name: Category.name, schema: CategorySchema }
      ]),
   ],
   controllers: [
      CategoryController
   ],
   providers: [
      CategoryService,
      OneTimeCode,
      GenerateToken,
      ClientModule
   ]
})
export class CategoryModule { }