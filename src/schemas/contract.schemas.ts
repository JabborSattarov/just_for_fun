import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ContractStatusEnum } from "src/enums/contract.enum";
import { CreateProductInterface } from "src/interfaces";

@Schema({
   timestamps: true
})
export class Contract extends Document {
   
   @Prop({
      type: String,
      required: true
   })
   contract_name: String

   @Prop({
      type: String,
      enum: ContractStatusEnum,
      default: ContractStatusEnum.DRAFT
   })
   contract_case: string

   @Prop({
      type: String,
      required: true
   })
   contract_details: string;

   @Prop({
      type: String,
   })
   constract_filePath?: string;
   @Prop({})
   product_data: CreateProductInterface[]

   @Prop({
      type: Boolean,
      default: true
   })
   status: Boolean

}  
export const ContractSchema = SchemaFactory.createForClass(Contract)