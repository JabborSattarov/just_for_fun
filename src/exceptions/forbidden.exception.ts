import { HttpMessage, HttpStatus } from "src/enums";
import { Exception } from "./exceptions";

export class ForbiddenException extends Exception {
   constructor(details:string, message:string){
      super({
         status: HttpStatus.FORBIDDEN,
         message: message ?? HttpMessage.FORBIDDEN,
         details: details,
   
      })
   }
}