import { Type } from "class-transformer";
import { IsBoolean, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString } from "class-validator";
import { WarehouseTypeEnum } from "src/enums/warehouse-category";
import { CreateWarehouseInterface } from "src/interfaces/warehouse.interface";

export class CreateWarehouseDto implements CreateWarehouseInterface {
   @IsString()
   @IsNotEmpty()
   warehouse_name: string;

   @IsNumber()
   @IsNotEmpty()
   warehouse_number: number;

   @IsString()
   @IsNotEmpty()
   warehouse_type: WarehouseTypeEnum;

   @IsBoolean()
   @IsOptional()
   isEmpty?: boolean;

   
}