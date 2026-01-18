import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { WarehouseTypeEnum } from "src/enums/warehouse-category";

@Schema({
   timestamps: true
})
export class Warehouse extends Document {
   @Prop({
      type: String,
      required: true
   })
   warehouse_name: string

   @Prop({
      type: Number,
      required: true,
   })
   warehouse_number: Number

   @Prop({
      type: String,
      enum: WarehouseTypeEnum,
      required: true
   })
   warehouse_type: string

   @Prop({
      type: Boolean,
      default: true
   })
   isEmpty:Boolean

   @Prop({
      type: Boolean,
      default: true
   })
   status: boolean
}
export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);