import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientCreateRequest, ClientCreateResponse } from "src/interfaces";



@Injectable()
export class ClientService {
   constructor(){}

   async create(data : ClientCreateRequest): Promise<ClientCreateResponse>{

      console.log(data)


      return  {
         status: 100,
         message: "",
         access_token:"",
         hash:""
      }
   }
}