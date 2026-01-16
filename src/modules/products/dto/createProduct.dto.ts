import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateIf, ValidateNested } from "class-validator";
import { ProductTypeEnum } from "src/enums";

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

   @IsString()
   @IsNotEmpty()
   @MaxLength(10)
   @MinLength(2)
   product_sku: string;

   @IsArray()
   @ValidateIf(body => body.product_type === ProductTypeEnum.VARIANT_PARENT)
   @ArrayNotEmpty()
   @ValidateNested({each: true})
   @Type(() => CreateProductDto)
   product_child?: CreateProductDto[];
}

