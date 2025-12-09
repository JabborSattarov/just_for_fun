import { Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Item extends Document {
   
}

export const ItemSchema = SchemaFactory.createForClass(Item);
