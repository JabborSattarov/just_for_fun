
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Client } from "./clients.schemas";

@Schema({
  timestamps: true
})
export class Permissions extends Document {
   @Prop({
      type: Boolean,
      default: false,
   })
   edit_user: boolean

   @Prop({
      type: Boolean,
      default: false,
   })
   edit_products : boolean


   // Relatonships
   @Prop({
      type: mongoose.Types.ObjectId,
      ref: "Client",
   })
   users: Client
}
export const PermissionSchema = SchemaFactory.createForClass(Permissions)