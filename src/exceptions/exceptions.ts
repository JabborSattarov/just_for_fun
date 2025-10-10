import { HttpStatus } from "@nestjs/common";
import { ExceptionParams } from "src/interfaces";

export class Exception extends Error {
   readonly #_status: HttpStatus
   readonly #_message: string
   readonly #_detatil: unknown
   readonly #_exception: string

   constructor(params: ExceptionParams){

      super(params.message)

      this.#_status = params.status
      this.#_message = params.message
      this.#_detatil = params.details
      this.#_exception = params.exception
   }

   getStatus(): HttpStatus {
      return this.#_status
   }
   getMessage():string{
      return this.#_message
   }
   getDetails():unknown{
      return this.#_detatil
   }
   getExeption():string {
      return this.#_exception
   }
}
