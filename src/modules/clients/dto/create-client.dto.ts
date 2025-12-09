import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ClientCreateRequest, ClientDeleteRequestInterface } from "../../../interfaces/client.interface";
import { clientRole } from "src/enums/role.enums";


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
   @IsEnum(clientRole)
   role: string;
}