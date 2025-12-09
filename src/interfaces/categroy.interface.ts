import { ClientCreateResponse } from "./client.interface";

export interface CreateCategoryInterface {
   category_name: string
}
export interface DeleteCategoryInterface {
   id: string
}
export interface CreateCategoryResponseInterface {
   status: number,
   message: string,
   access_token: string,
   data?: unknown
   hash: string
}
