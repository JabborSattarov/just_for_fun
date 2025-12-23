import { Module } from "@nestjs/common";
import { SubCategoryController } from "./sub-category.controller";
import { SubCategoryService } from "./sub-caterogory.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SubCategory, SubCategorySchema } from "src/schemas/sub-category.schema";
import { Category, CategorySchema } from "src/schemas/category.schemas";
import { GenerateToken, OneTimeCode } from "src/utils";
import { Client, ClientSchema } from "src/schemas/clients.schemas";
import { ClientModule } from "../clients/clients.module";

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Client.name, schema: ClientSchema },
         { name: SubCategory.name, schema: SubCategorySchema },
      ]),
   ],
   controllers: [SubCategoryController],
   providers: [
      SubCategoryService,
      GenerateToken,
      OneTimeCode
   ],
   exports: []
})
export class SubCategoryModule { }