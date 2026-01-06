import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";
import { ProductTypeEnum } from "src/enums";
import { WarehouseCategoryEnum } from "src/enums/warehouse-category";

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
      enum: WarehouseCategoryEnum,
      required: true
   })
   wharehouse_type: string
}