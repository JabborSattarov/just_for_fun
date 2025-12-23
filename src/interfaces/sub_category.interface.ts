import { ClientCreateResponse } from "./client.interface";

export interface CreateSubCategoryInterface {
   subcategory_name: string
}
export interface DeleteSubCategoryInterface {
   id: string
}
export interface CreateSubCategoryResponseInterface {
   status: number,
   message: string,
   access_token: string,
   data?: unknown
   hash: string
}
