import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { clientRole } from "src/enums/role.enums";

@Schema({
   timestamps:true,
})
export class Client {
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
   user_login:String
   
   @Prop({
      type: String,
      required: true
   })
   user_password: String
   
   @Prop({
      type: String,
      enum: clientRole,
      default: 'admin'
   })
   role: String
   
   @Prop({
      type:Boolean,
      default: true,
      required: true
   })
   status: Boolean
}


export const ClientSchema = SchemaFactory.createForClass(Client);