import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { ClientService } from "./clients.service";
import { ClientCreateDto, ClientDeleteDto } from "./dto";
import { ClientCreateResponse, CustomeRequestInterface} from "src/interfaces";

import { Roles } from "src/decorators";
import { CheckRoleGuard, CheckTokenGuard } from "src/guards";


@Controller("client")
export class ClientConroller {
   readonly    #_service: ClientService
   constructor(service:ClientService){
      this.#_service = service
   }


   @UseGuards(
      CheckTokenGuard, 
      CheckRoleGuard
   )
   @Roles("admin", "manager")
   @Post("create")
   createClient(@Body() body: ClientCreateDto, @Req() req: CustomeRequestInterface): Promise<ClientCreateResponse> {
      return this.#_service.create(body, req)
   }


   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )
   @Roles("admin", "manager")
   @Delete("delete/:id")
   deleteClient(@Param() param: ClientDeleteDto, @Req() req: CustomeRequestInterface): Promise<ClientCreateResponse>{
      return this.#_service.delete(param, req)
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )
   @Roles("admin", "manager")
   @Get("get/all")
   getAllClient(@Req() req: CustomeRequestInterface): Promise<ClientCreateResponse> {
      return this.#_service.getAll(req)
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )
   @Roles("admin", "manager")
   @Get("get/:id")
   getOneClient(@Param() param: ClientDeleteDto, @Req() req: CustomeRequestInterface) : Promise<ClientCreateResponse>{
      return this.#_service.getOne(param, req)
   }
}