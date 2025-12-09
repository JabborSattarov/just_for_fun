import { IsNotEmpty, IsString } from "class-validator";
import { CreateCategoryInterface, DeleteCategoryInterface } from "src/interfaces";

export class CreateCategoryDto implements CreateCategoryInterface {
   @IsString()
   @IsNotEmpty()
   category_name: string;
}

export class deleteCategoryDto implements DeleteCategoryInterface {
   @IsString()
   @IsNotEmpty()
   id: string;
}