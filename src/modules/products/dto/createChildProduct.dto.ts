import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ProductTypeEnum } from "src/enums";
import { CreateProductInterface } from "src/interfaces";

export class CreateChildProductDto implements CreateProductInterface {
   @IsString()
   @IsNotEmpty()
   product_name: string;

   @IsString()
   @IsDefined()
   product_brand: string;

   @IsString()
   @IsDefined()

   product_size: string;

   @IsString()
   @IsDefined()

   product_with: string;

   @IsString()
   @IsDefined()

   product_height: string;

   @IsString()
   @IsDefined()

   product_weight: string;

   @IsString()
   @IsDefined()

   product_manufacture: string;
   @IsString()
   @IsDefined()

   product_expiration: string;

   @IsString()
   @IsDefined()

   product_made_in: string;

   @IsString()
   @IsDefined()

   product_color: string;

   @IsString()
   @IsDefined()

   product_description: string;
}

