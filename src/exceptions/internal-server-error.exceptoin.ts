
import { HttpStatus } from "src/enums/http-status.enum";
import { Exception } from "./exceptions";
import { HttpMessage } from "src/enums/http-message.enum";

export class InternalServerErrorException extends Exception {
   constructor(details?: unknown, message?: string){
      super({
         status: HttpStatus.INTERNAL_SERVER_ERROR,
         message: message ?? HttpMessage.INTERNAL_SERVER_ERROR,
         details,

      })
   }
}