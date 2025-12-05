
import { HttpStatus } from "src/enums/http-status.enum";
import { Exception } from "./exceptions";
import { HttpMessage } from "src/enums/http-message.enum";

export class NotFoundException extends Exception {
   constructor(details?: unknown, message?: string){
      super({
         status: HttpStatus.NOT_FOUND,
         message: message ?? HttpMessage.NOT_FOUND,
         details,

      })
   }
}