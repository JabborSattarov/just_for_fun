import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
   timestamps: true
})

export class HistorySchema extends Document{
   @Prop({
      type: String,
      required: true
   })
   event: String 

   @Prop({
      type: String,
      required: true 
   })
   which_endpoint: string

   @Prop({
      type: mongoose.Types.ObjectId,
      required: true
   })
   who_did: mongoose.Types.ObjectId
}