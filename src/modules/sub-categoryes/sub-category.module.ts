import { Module } from "@nestjs/common";
import { SubCategoryController } from "./sub-category.controller";
import { SubCategoryService } from "./sub-caterogory.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SubCategory, SubCategorySchema } from "src/schemas/sub-category.schema";
import { Category, CategorySchema } from "src/schemas/category.schemas";

@Module({
   imports:[
      MongooseModule.forFeature([
         { name: SubCategory.name, schema: SubCategorySchema },
         { name: Category.name, schema: CategorySchema },
      ])
   ],
   controllers:[SubCategoryController],
   providers:[
      SubCategoryService
   ],
   exports:[]
})
export class SubCategoryModule {}