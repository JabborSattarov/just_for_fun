import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Matches } from "class-validator";
import mongoose, { Document } from "mongoose";
import { ProductTypeEnum } from "src/enums";

@Schema()
export class Product extends Document {
   @Prop({
      type:String,
      required: true
   })
   product_name: string

   @Prop({
      type: String,
      required: true
   })
   product_brand: string
   
   @Prop({
      type: String,
   })
   product_barcode: string
   
   @Prop({
      type: String,
   })
   product_size: string
   
   @Prop({
      type: String,
   }) 
   product_color: string
  
   @Prop({
      type: String,
   })
   product_with: string
   
   @Prop({
      type: String,
   }) 
   product_height: string
   
   @Prop({
      type: String,
   }) 
   product_weight: string

   @Prop({
      type: String,
   }) 
   product_manufacture: string

   @Prop({
      type: String,
   }) 
   product_expiration: string 

   @Prop({
      type: String,
   })
   product_description: string

   @Prop({
      type: String,
      enum: ProductTypeEnum,
      required: true
   })
   product_type: string

   @Prop({
      type:String,
      required: true,
      unique: true
   })
   product_sku: string;

   @Prop({
      type: String,
   })
   parent_id?: string

   @Prop({
      type:Boolean,
      default: true
   })
   status: boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product);
