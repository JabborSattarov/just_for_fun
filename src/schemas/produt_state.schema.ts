import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
   timestamps: true
})
export class ProductState extends Document {
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
      type: Boolean,
      default: true
   })
   status: Boolean
}

export const ProductStateSchema = SchemaFactory.createForClass(ProductState)
