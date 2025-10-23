import { CreateClientInterface } from "./client.interface";


export interface CreatePermissionInterface {
   edit_user: boolean,
   edit_product: boolean,
   users: CreateClientInterface,
}