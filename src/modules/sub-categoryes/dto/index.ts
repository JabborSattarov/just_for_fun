import { IsNotEmpty, IsString } from "class-validator";
import { CreateSubCategoryInterface, DeleteSubCategoryInterface } from "src/interfaces";


export class CreateSubCategoryDto implements CreateSubCategoryInterface {
   @IsString()
   @IsNotEmpty()
   category_name: string;
}

export class deleteSubCategoryDto implements DeleteSubCategoryInterface {
   @IsString()
   @IsNotEmpty()
   id: string;
}