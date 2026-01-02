import { Response } from "express";
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Exception } from "src/exceptions";
import { HttpMessage } from "src/enums";

@Catch()
export class GlobalExeptionFilter implements ExceptionFilter {
   catch(exception: any, host: ArgumentsHost) :Response {
      const express: HttpArgumentsHost = host.switchToHttp()
      const response: Response = express.getResponse<Response>()
      
      console.log("from exaption",exception)
      if (exception instanceof Exception) {

         const status:HttpStatus = exception.getStatus();

         if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
            return response.status(status).json({
               message: exception.getMessage(),
            })
         }
         return response.status(status).json({
            status,
            message: exception.getMessage(),
            details: exception.getDetails(),
         })
      }
      
      return response.status(exception?.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
         message: exception?.message ?? HttpMessage.INTERNAL_SERVER_ERROR,
         details: exception?.details
      })
   }
}