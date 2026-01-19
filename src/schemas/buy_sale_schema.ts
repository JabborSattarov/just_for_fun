import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { SalesStatusEnum, SalesTypeEnum } from "src/enums";

@Schema({
   timestamps: true
})
export class Sales extends Document {
   @Prop({
      type: String,
      required: true
   })
   warehouse_id: string

   @Prop({
      type: String,
      required: true
   })
   product_id: string

   @Prop({
      type: Number,
      required: true
   })
   quantity: number

   @Prop({
      required: true,
      enum: SalesTypeEnum
   })
   sales_type: SalesTypeEnum

   @Prop({
      enum: SalesStatusEnum,
      default: SalesStatusEnum.DRAFT
   })
   sales_status: SalesStatusEnum
}

export const SalesSchema = SchemaFactory.createForClass(Sales)
