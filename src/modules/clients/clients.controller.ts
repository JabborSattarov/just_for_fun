import { Body, Controller, Post } from "@nestjs/common";
import { ClientService } from "./clients.service";
import { ClientCreateDto } from "./dto";
import { ClientCreateResponse } from "src/interfaces";


@Controller("client")
export class ClientConroller {
   constructor(private readonly clientService: ClientService){}
   @Post("create")
   createClient(@Body() body: ClientCreateDto): Promise<ClientCreateResponse> {
      return this.clientService.create(body)
   }
}