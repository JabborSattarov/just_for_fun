import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { ClientService } from "./clients.service";
import { ClientCreateDto, ClientDeleteDto } from "./dto";
import { ClientCreateResponse, ClientDeleteRequestInterface, CustomeRequestInterface} from "src/interfaces";
import { CheckTokenGuard } from "src/guards/check-token.guard";
import { CheckRoleForAdminGuard } from "src/guards/check-role.guard";
import { ClientCreateValidationPipe } from "src/pipes/client.pipe";


@Controller("client")
export class ClientConroller {
   readonly    #_service: ClientService
   constructor(service:ClientService){
      this.#_service = service
   }


   @UseGuards(
      CheckTokenGuard, 
      CheckRoleForAdminGuard
   )
   @UsePipes(
      ClientCreateValidationPipe
   )
   @Post("create")
   createClient(@Body() body: ClientCreateDto, @Req() req: CustomeRequestInterface): Promise<ClientCreateResponse> {
      return this.#_service.create(body, req)
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleForAdminGuard
   )
   @Post("delete/:id")
   deleteClient(@Param() param: ClientDeleteDto, @Req() req: CustomeRequestInterface): Promise<ClientCreateResponse>{
      return this.#_service.delete(param, req)
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleForAdminGuard
   )
   @Get(":id")
   getOneClient(@Param() param: ClientDeleteDto, @Req() req: CustomeRequestInterface) : Promise<ClientCreateResponse>{
      return this.#_service.getOne(param, req)
   }
}