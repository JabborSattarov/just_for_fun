import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import mongoose, { Connection, Model } from "mongoose";
import { BadRequestException, NotFoundException } from "src/exceptions";
import { CustomeRequestInterface, ResponseInterface } from "src/interfaces";
import { CreateSalesInterface } from "src/interfaces/sales.interface";
import { Sales } from "src/schemas/buy_sale_schema";
import { GenerateToken } from "src/utils";
import { ResponseSalesDto } from "./dto/response.dto";
import { SalesStatusEnum, SalesTypeEnum } from "src/enums";
import { ProductState } from "src/schemas/produt_state.schema";
import { InternalServerErrorException } from "src/exceptions/internal-server-error.exceptoin";
import { formatErrors } from "src/utils/error.formater";


@Injectable()
export class SalesService {
   constructor(
      @InjectModel(Sales.name) private readonly salesSchema: Model<Sales>,
      @InjectModel(ProductState.name) private readonly productStateSchema: Model<ProductState>,
      @InjectConnection() private readonly TransactionConnection: Connection,
      private readonly generateToken: GenerateToken,
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

      const salesResponse = plainToInstance(ResponseSalesDto, { id: sales._id, ...sales })

      return {
         status: 200,
         message: "OK !",
         data: salesResponse,
         ...tokens
      }
   }

   async getAllSales(req: CustomeRequestInterface): Promise<ResponseInterface> {

      const sales = await this.salesSchema.find().lean()

      for (let i = 0; i < sales.length; i++) {
         const sale = sales[i];
         sale.id = String(sale._id)
      }

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      const salesResponse = plainToInstance(ResponseSalesDto, sales)

      return {
         status: 200,
         message: "OK !",
         data: salesResponse ? salesResponse : [],
         ...tokens
      }
   }

   async acceptSales(id: string, req: CustomeRequestInterface): Promise<ResponseInterface> {

      const session = await this.TransactionConnection.startSession()
      try {
         session.startTransaction()

         const findSales = await this.salesSchema.findOne({
            _id: new mongoose.Types.ObjectId(id),
            sales_status: SalesStatusEnum.DRAFT
         },
            null,
            {
               session
            })

         if (!findSales) {
            throw new NotFoundException("", "sales not found")
         }

         findSales.sales_status = SalesStatusEnum.ACCEPTED
         await findSales.save({ session })

         const findProductState = await this.productStateSchema.findOne({
            product_id: findSales.product_id,
            warehouse_id: findSales.warehouse_id,
            status: true
         }, null, { session })

         if (!findProductState) {

            const newProductState = await this.productStateSchema.create([{
               quantity: findSales.quantity,
               warehouse_id: findSales.warehouse_id,
               product_id: findSales.product_id,
            }], { session })

            console.log("product state if",newProductState)
         } else {

            console.log("Product state else ", findProductState)
            if (findSales.sales_type == SalesTypeEnum.BUY) {
               findProductState.quantity += findSales.quantity
               await findProductState.save({ session })
            }
            if (findSales.sales_type == SalesTypeEnum.SALE) {
               if (findProductState.quantity - findSales.quantity < 0) {
                  throw new BadRequestException("", "product is not enoutht!")
               }
               findProductState.quantity -= findSales.quantity
               await findProductState.save({ session })
            }
         }
         const SECERT_KEY = process.env.AES_SECRET_KEY
         const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)
         await session.commitTransaction();

         return {
            status: 200,
            message: "Accepted!",
            ...tokens
         }
      } catch (error) {
         console.error("error", error);

         await session.abortTransaction();
         throw new InternalServerErrorException(
            error,
            `transaction has failed! ${error.message}`
         );
      } finally {
         session.endSession()

      }
   }
   async rejectSales(id: string, req: CustomeRequestInterface): Promise<ResponseInterface> {

         const findSales = await this.salesSchema.findOne({
            _id: new mongoose.Types.ObjectId(id),
            sales_status: SalesStatusEnum.DRAFT
         })

         if (!findSales) {
            throw new NotFoundException("", "sales not found")
         }

         findSales.sales_status = SalesStatusEnum.REJECTED
         await findSales.save()

       
         const SECERT_KEY = process.env.AES_SECRET_KEY
         const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

         return {
            status: 200,
            message: "Rejected!",
            ...tokens
         }
    
   }
}