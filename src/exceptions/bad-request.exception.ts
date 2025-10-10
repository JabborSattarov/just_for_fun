import { HttpMessage, HttpStatus } from "src/enums";
import { Exception } from "./exceptions";


export class BadRequestException extends Exception {
   constructor(details?: unknown, message?: string){
      super({
         status: HttpStatus.BAD_REQUEST,
         message: message ?? HttpMessage.BAD_REQUEST,
         details,

      })
   }
}