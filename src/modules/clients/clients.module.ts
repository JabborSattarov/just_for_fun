import { Module } from "@nestjs/common";
import { ClientConroller } from "./clients.controller";
import { ClientService } from "./clients.service";

@Module({
   imports:[],
   providers:[ClientService],
   controllers:[ClientConroller],
   exports:[]
})
export class ClientModule {}