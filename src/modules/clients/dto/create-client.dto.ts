import { IsNotEmpty, IsString } from "class-validator";
import { ClientCreateRequest } from "../interfaces/client.interface";


export class ClientCreateDto implements ClientCreateRequest {
   @IsString()
   @IsNotEmpty()
   user_firstname: string;

   @IsString()
   @IsNotEmpty()
   user_lastname: string;

   @IsString()
   @IsNotEmpty()
   user_email: string;

   @IsString()
   @IsNotEmpty()
   user_phone: string;

   @IsString()
   @IsNotEmpty()
   role: string;
}