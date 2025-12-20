import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Item } from "./items.schemas";
import { Category } from "./category.schemas";


@Schema({
   timestamps: true
})
export class SubCategory extends Document { 
   @Prop({
      required: true,
      type: String
   })
   subcategory_name: string

   @Prop({
      type: Boolean,
      default: true
   })
   status: Boolean



   @Prop({
      type: mongoose.Types.ObjectId,
      required: true,

   })
   category_id: Category
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

SubCategorySchema.index(
   {category_name: 1},
   {unique: true, partialFilterExpression: { status:true }}
)