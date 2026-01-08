import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ProductTypeEnum } from "src/enums";
import { CreateProductInterface } from "src/interfaces";
import { CreateChildProductDto } from "./createChildProduct.dto";

export class CreateProductDto {
   @IsString()
   @IsNotEmpty()
   product_name: string;

   @IsEnum(ProductTypeEnum)
   @IsNotEmpty()
   product_type: ProductTypeEnum;

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
   @ValidateIf(body => body.product_type === ProductTypeEnum.EXPIRABLE)
   @IsNotEmpty()
   product_manufacture: string;

   @IsString()
   @ValidateIf(body => body.product_type === ProductTypeEnum.EXPIRABLE)
   @IsNotEmpty()
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

   @IsArray()
   @ValidateIf(body => body.product_type === ProductTypeEnum.VARIANT)
   @ArrayNotEmpty()
   @ValidateNested({each: true})
   @Type(() => CreateChildProductDto)
   product_child?: CreateChildProductDto[];
}

