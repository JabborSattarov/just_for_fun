import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
   timestamps: true
})
export class Category extends Document { 
   @Prop({
      required: true,
      type: String
   })
   category_name: string

   @Prop({
      type: Boolean,
      default: true
   })
   status: Boolean
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index(
   {category_name: 1},
   {unique: true, partialFilterExpression: { status:true }}
)