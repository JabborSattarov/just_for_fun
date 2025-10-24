import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomeRequestInterface } from "src/interfaces/token.interface";
import { Client } from "src/schemas/clients.schemas";
import { GenerateToken, HashingId, OneTimeCode } from "src/utils";


export class CheckRoleForAdminGuard implements CanActivate {
      
      constructor(
         @InjectModel(Client.name) private readonly clientSchema: Model<Client>,
         private readonly generateToken: GenerateToken,
         private readonly oneTimeCode: OneTimeCode,
      ){}
   
     async canActivate(context: ExecutionContext): Promise<boolean> {
         const request : CustomeRequestInterface = context.switchToHttp().getRequest();   
         const { role } = request["decode"];
         
         if (role !== "admin") {
            throw new ForbiddenException("", "You dont have access !")
         }
         
         return  true
      }
}