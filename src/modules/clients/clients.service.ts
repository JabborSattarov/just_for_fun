import { Injectable } from "@nestjs/common";
import { ClientCreateRequest, ClientCreateResponse } from "./interfaces";
import { InjectModel } from "@nestjs/mongoose";



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