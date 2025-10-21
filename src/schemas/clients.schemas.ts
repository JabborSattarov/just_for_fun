import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { clientRole } from "src/enums/role.enums";
import { Permissions } from "./permissions.schema";
@Schema({
   timestamps:true,
})
export class Client extends Document{
   @Prop({
      required: true,
      type: String,
   })
   user_firstname: string;

   @Prop({
      type:String
   })
   user_lastname:string;

   @Prop({
      unique:true,
      type: String
   })
   user_email: string;

   @Prop({
      type: String
      
   })
   user_phone: string;
   
   @Prop({
      type: String,
      unique:true,
      required: true
   })
   user_login:string
   
   @Prop({
      type: String,
      required: true
   })
   user_password: string

   @Prop({
      type: String,
      required: true
   })
   secret_key_access: string
   
   @Prop({
      type: String,
      required: true
   })
   secret_key_refresh: string

   @Prop({
      type: Date
   })
   token_given_time: Date

   @Prop({
      type: String,
      enum: clientRole,
      default: 'admin'
   })
   role: string
   
   @Prop({
      type:Boolean,
      default: true,
      required: true
   })
   status: boolean


   // Relationships
   @Prop({
      type: mongoose.Types.ObjectId,
      ref: "Permissions",
   })
   permissions: Permissions
}


export const ClientSchema = SchemaFactory.createForClass(Client);