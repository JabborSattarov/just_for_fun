import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Contract } from "./contract.schemas";
import mongoose, { Document } from "mongoose";
import { ProductTypeEnum } from "src/enums";


@Schema()
export class ProductBehaviours {
   @Prop({
      type: String,
      required: true
   })
   product_model: string

   @Prop({
      type: String,
   })
   product_size: string
   
   @Prop({
      type: String
   })
   product_with: string
   
   @Prop({
      type: String
   })
   product_height: string
   
   @Prop({
      type: String
   })
   product_weight: string
   
   @Prop({
      type: String
   })
   product_manufacture_date: Date
   
   @Prop({
      type: String
   })
   product_expiration_date: Date
   
   @Prop({
      type: String,
      required: true
   })
   product_made_in: string
   
   @Prop({
      type: String
   })
   product_color: string

   @Prop({
      type: String
   })
   product_count: string
}


@Schema()
export class Product extends Document {
   @Prop({
      type:String,
      required: true
   })
   product_name: string

   @Prop({
      type: String,
      enum: ProductTypeEnum,
      required: true
   })
   product_type: string

   @Prop({
      type: ProductBehaviours,
      required:true
   })
   product_behaviours: ProductBehaviours

   @Prop({
      type:Boolean,
      default: true
   })
   status: boolean
   
   @Prop({
      type: mongoose.Types.ObjectId,
      required: true
   })
   contract_id: Contract
}

export const ProductSchema = SchemaFactory.createForClass(Product);
