import { SalesStatusEnum, SalesTypeEnum } from "src/enums";

export interface CreateSalesInterface {
   warehouse_id: string,
   product_id: string,
   quantity: number,
   sales_type: SalesTypeEnum,
   sales_status:SalesStatusEnum
}

export interface ResponseInterface {
   status:string,
   message: string,
   data?: unknown,
   access_token: string,
   hash: string,
}