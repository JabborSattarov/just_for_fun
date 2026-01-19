import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SalesStatusEnum, SalesTypeEnum } from "src/enums";
import { CreateSalesInterface } from "src/interfaces/sales.interface";

export class CreateSalesDto implements CreateSalesInterface {
   @IsString()
   @IsNotEmpty()
   warehouse_id: string;
   
   @IsString()
   @IsNotEmpty()
   product_id: string;
   
   @IsNumber()
   @IsNotEmpty()
   quantity: number;

   @IsString()
   @IsNotEmpty()
   sales_type: SalesTypeEnum;

   @IsString()
   @IsNotEmpty()
   sales_status: SalesStatusEnum;
}
