import { HttpStatus } from "@nestjs/common";

export declare interface ExceptionParams {
   status: HttpStatus
   message: string
   details?: unknown
   exception?: string
}