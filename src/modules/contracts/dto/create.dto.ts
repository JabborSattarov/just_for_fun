import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ContractStatusEnum } from "src/enums";
import { CreateContractInterface } from "src/interfaces/contract.interface";
import { CreateProductDto } from "src/modules/products/dto/createProduct.dto";

export class CreateContractDto implements CreateContractInterface {
   @IsString()
   @IsNotEmpty()
   contract_name: string;

   @IsString()
   @IsOptional()
   contract_case: ContractStatusEnum = ContractStatusEnum.DRAFT;

   @IsString()
   @IsNotEmpty()
   contract_details: string;

   @IsString({ message: "product must be JSON" })
   @IsNotEmpty({ message: "product must not be empty" })
   products: CreateProductDto[];

}