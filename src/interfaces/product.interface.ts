import mongoose from "mongoose";
import { ProductTypeEnum } from "src/enums";


export interface CreateProductInterface {
   product_name: string,
   product_brand?: string,
   product_type?: ProductTypeEnum,
   product_size?: string,
   product_with?: string,
   product_height?: string,
   product_weight?: string,
   product_manufacture?: string,
   product_expiration?: string,
   product_made_in?: string,
   product_color?: string,
   product_description?: string,
   product_child?: CreateChildProductInterface[]
}
export interface ResponseForCreateProductInterface {
   id:string
   product_name: string,
   product_brand?: string,
   product_type?: string,
   product_size?: string,
   product_with?: string,
   product_height?: string,
   product_weight?: string,
   product_manufacture?: string,
   product_expiration?: string,
   product_made_in?: string,
   product_color?: string,
   product_description?: string,
   product_child?: ResponseForCreateChildProductInterface[]
}
export interface CreateChildProductInterface {
   product_name: string,
   product_brand?: string,
   product_size?: string,
   product_with?: string,
   product_height?: string,
   product_weight?: string,
   product_manufacture?: string,
   product_expiration?: string,
   product_made_in?: string,
   product_color?: string,
   product_description?: string,
   parent_id: string
}
export interface ResponseForCreateChildProductInterface {
   id:string
   product_name: string,
   product_brand?: string,
   product_size?: string,
   product_with?: string,
   product_height?: string,
   product_weight?: string,
   product_manufacture?: string,
   product_expiration?: string,
   product_made_in?: string,
   product_color?: string,
   product_description?: string,   
}
export interface ResponseInterface {
   status: number,
   message: string,
   access_token: string,
   hash: string,
   data?: unknown
}