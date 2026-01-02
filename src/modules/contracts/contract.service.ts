import { Injectable } from "@nestjs/common";
import { ContractResponseInterface, CreateContractInterface } from "src/interfaces";
import { CreateContractDto } from "./dto";
import { CreateContractValidatonPipe } from "src/pipes";
import { UploadFile } from "src/utils/upload-file";
import { FileTypeEnum } from "src/enums/file-type.enum";
import { InjectModel } from "@nestjs/mongoose";
import { Contract } from "src/schemas/contract.schemas";
import { Model } from "mongoose";
import { ContractStatusEnum } from "src/enums";
import { Product } from "src/schemas/product.schemas";


@Injectable()
export class ContractService {
   constructor(
      @InjectModel(Contract.name) private readonly contractSchema: Model<Contract>,
      @InjectModel(Product.name) private readonly productSchema: Model<Product>
   ){} 
   async createContract(file: Express.Multer.File , body: CreateContractInterface): Promise<ContractResponseInterface>{
      const { validatedFile, validatedBody } = await new CreateContractValidatonPipe().transform({ file, body });

      const filePath = UploadFile(validatedFile, "CONTRACT")
      
      let {contract_name, contract_details, contract_case, contract_filePath = filePath, products} = validatedBody;
      const newContract = {
         contract_name,
         contract_details,
         contract_case: contract_case ? contract_case :  ContractStatusEnum.DRAFT,
         contract_filePath,
      }

      const {_id} = await this.contractSchema.create(newContract)
      for (const product of products) {

         console.log("product", product)
         
         const newProduct = {
            ...product,
            contract_id: _id
         };
         
         console.log("new product",newProduct)
         const {product_name} = await this.productSchema.create(newProduct)
         console.log(product_name)
         
      }

      return 
   }
}