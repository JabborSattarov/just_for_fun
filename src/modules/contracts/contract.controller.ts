import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { ContractService } from "./contract.service";
import { ContractResponseInterface, CreateContractInterface } from "src/interfaces";
import { CreateContractDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateContractValidatonPipe } from "src/pipes";
import { CreateProductDto } from "../products/dto/createProduct.dto";
import { plainToInstance } from "class-transformer";
import { validateOrReject, validateSync } from "class-validator";
import { BadRequestException } from "src/exceptions";


@Controller("contract")
export class ContractController {

   constructor(
      private readonly service: ContractService
   ){}
   
   @Post("create")
   @UseInterceptors(FileInterceptor("file"))   
   async createContract( 
      @UploadedFile() file:Express.Multer.File,  
      @Body() body: CreateContractInterface
   
   ): Promise<ContractResponseInterface> {
      return this.service.createContract(file , body)
   }
}