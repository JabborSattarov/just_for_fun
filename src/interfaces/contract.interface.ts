import { CreateProductInterface } from "./product.interface";

export interface ContractResponseInterface {
   status: number,
   message: string,
   data?: unknown,
   access_token: string,
   hash: string
}



export interface CreateContractInterface {
   contract_name: string,
   contract_details:string,
   contract_case?: string,
   contract_filePath?:string,
   products: CreateProductInterface[]
}
