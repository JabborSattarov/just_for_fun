import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ClientService } from "./clients.service";
import { ClientCreateDto } from "./dto";
import { ClientCreateResponse } from "src/interfaces";
import { CheckTokenGuard } from "src/guards/check-token.guard";
import { CustomeRequestInterface } from "src/interfaces/token.interface";
import { CheckRoleForAdminGuard } from "src/guards/check-role.guard";


@Controller("client")
export class ClientConroller {
   readonly #_service: ClientService
   constructor(service:ClientService){
      this.#_service = service
   }


   @UseGuards(CheckTokenGuard, CheckRoleForAdminGuard)
   @Post("create")
   createClient(@Body() body: ClientCreateDto, req: CustomeRequestInterface): Promise<ClientCreateResponse> {
      return this.#_service.create(body)
   }
}