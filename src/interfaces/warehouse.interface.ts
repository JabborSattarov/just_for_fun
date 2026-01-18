import { WarehouseTypeEnum } from "src/enums/warehouse-category";

export interface CreateWarehouseInterface {
   warehouse_name: string,
   warehouse_number: number,
   warehouse_type: WarehouseTypeEnum,
   isEmpty?:boolean,
}

export interface ResponseWarehouseInterface {
   status: number,
   message: string,
   data?: unknown,
   access_token: string,
   hash:string
}