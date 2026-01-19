import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import mongoose, { Model } from "mongoose";
import { NotFoundException } from "src/exceptions";
import { CustomeRequestInterface, ResponseInterface } from "src/interfaces";
import { CreateSalesInterface } from "src/interfaces/sales.interface";
import { Sales } from "src/schemas/buy_sale_schema";
import { GenerateToken } from "src/utils";
import { ResponseSalesDto } from "./dto/response.dto";


@Injectable()
export class SalesService {
   constructor(
      @InjectModel(Sales.name) private readonly salesSchema: Model<Sales>,
      private readonly generateToken: GenerateToken
   ) { }

   async createSales(body: CreateSalesInterface, req: CustomeRequestInterface): Promise<ResponseInterface> {

      await this.salesSchema.create(body)
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)
      return {
         status: 201, 
         message: "Created !",
         ...tokens
      }
   }

   async getOneSales(id: string, req: CustomeRequestInterface): Promise<ResponseInterface> {

      const sales = await this.salesSchema.findOne({
         _id: new mongoose.Types.ObjectId(id)
      }).lean()
      if (!sales) {
         throw new NotFoundException("", "Not Found ")
      }
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      const salesResponse = plainToInstance(ResponseSalesDto, {id: sales._id , ...sales})

      return {
         status: 200,
         message: "OK !",
         data: salesResponse,
         ...tokens
      }
   }

}