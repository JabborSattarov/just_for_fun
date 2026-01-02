import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProductTypeEnum } from "src/enums";
import { CreateProductInterface, ProductBehavioursInterface } from "src/interfaces";

export class ProductBehaviourDto implements ProductBehavioursInterface {
   @IsString()
   @IsNotEmpty()
   product_model: string;
   
   @IsString()
   @IsNotEmpty()
   product_size: string;
   
   @IsString()
   @IsNotEmpty()
   product_with: string;
   
   @IsString()
   @IsNotEmpty()
   product_height: string;
   
   @IsString()
   @IsNotEmpty()
   product_weight: string;
   
   @IsString()
   @IsNotEmpty()
   product_manufacture_date: string;
   
   @IsString()
   @IsNotEmpty()
   product_expiration_date: string;
   
   @IsString()
   @IsNotEmpty()
   
   @IsString()
   @IsNotEmpty()
   product_made_in: string;
   
   @IsString()
   @IsNotEmpty() 
   product_color: string;
   
   @IsString()
   @IsNotEmpty() 
   product_count: string
}

export class CreateProductDto implements CreateProductInterface {
   @IsString()
   @IsNotEmpty()
   product_name: string;

   @IsEnum(ProductTypeEnum)
   @IsNotEmpty()
   product_type: ProductTypeEnum;
   
   @IsObject()
   @IsNotEmpty()
   product_behaviours: ProductBehaviourDto;

}