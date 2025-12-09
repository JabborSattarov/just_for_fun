import { IsNotEmpty, IsString } from "class-validator";
import { ClientDeleteRequestInterface } from "src/interfaces";

export class ClientDeleteDto implements ClientDeleteRequestInterface {
   @IsString()
   @IsNotEmpty()
   id: string
}