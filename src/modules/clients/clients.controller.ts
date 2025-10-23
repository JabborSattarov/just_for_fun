import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ClientService } from "./clients.service";
import { ClientCreateDto } from "./dto";
import { ClientCreateResponse } from "src/interfaces";
import { CheckTokenGuard } from "src/guards/check-token.guard";


@Controller("client")
export class ClientConroller {
   readonly #_service: ClientService
   constructor(service:ClientService){
      this.#_service = service
   }


   @UseGuards(CheckTokenGuard)
   @Post("create")
   createClient(@Body() body: ClientCreateDto): Promise<ClientCreateResponse> {
      return this.#_service.create(body)
   }
}