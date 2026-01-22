import { Exclude, Expose } from "class-transformer";
import { SalesStatusEnum, SalesTypeEnum } from "src/enums";

@Exclude()
export class ResponseSalesDto {
   @Expose()
   id: string
   
   @Expose()
   warehouse_id: string;
   
   @Expose()
   product_id: string;
   
   @Expose()
   quantity: number;

   @Expose()
   sales_type: SalesTypeEnum;

   @Expose()
   sales_status: SalesStatusEnum;
}
