import { Exclude, Expose, Transform } from "class-transformer";
import { WarehouseTypeEnum } from "src/enums/warehouse-category";


@Exclude()
export class ResponseWarehouseDto {
   @Expose()
   id: string;

   @Expose()
   warehouse_name: string

   @Expose()
   warehouse_number: number

   @Expose()
   warehouse_type: WarehouseTypeEnum

   @Expose()
   isEmpty: boolean

   @Expose()
   status: boolean

} 