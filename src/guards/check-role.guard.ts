import { CanActivate, ExecutionContext, Injectable, } from "@nestjs/common";
import { ForbiddenException } from "src/exceptions/forbidden.exception";
import { CustomeRequestInterface } from "src/interfaces/token.interface";
import { Reflector } from '@nestjs/core';

@Injectable()
export class CheckRoleGuard implements CanActivate {

   constructor(
      private readonly reflector: Reflector
   ) { }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: CustomeRequestInterface = context.switchToHttp().getRequest();
      const { role } = request["decode"];
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
         "roles",
         [context.getHandler(), context.getClass()]
      )

      if (!requiredRoles) {
         return true;
      }

      if (!requiredRoles.includes(role)) {
         throw new ForbiddenException("", "You dont have access !")
      }
      return true
   }
}

