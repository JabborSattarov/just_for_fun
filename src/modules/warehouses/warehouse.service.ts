import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import mongoose, { Model } from "mongoose";
import { BadRequestException, NotFoundException } from "src/exceptions";
import { CustomeRequestInterface } from "src/interfaces";
import { CreateWarehouseInterface, ResponseWarehouseInterface } from "src/interfaces/warehouse.interface";
import { Warehouse } from "src/schemas/warehouse.schema";
import { GenerateToken } from "src/utils";
import { ResponseWarehouseDto } from "./dto/responeDto";

@Injectable()
export class WarehouseService {
   constructor(
      @InjectModel(Warehouse.name) private readonly warehouseSchema: Model<Warehouse>,
      private readonly generateToken: GenerateToken

   ) { }

   async createWarehouse(body: CreateWarehouseInterface, req: CustomeRequestInterface): Promise<ResponseWarehouseInterface> {

      const checkForUnique = await this.warehouseSchema.findOne({ warehouse_number: body.warehouse_number, status: true })
      if (checkForUnique) {
         throw new BadRequestException("", "warehouse_number must be unique")
      }
      await this.warehouseSchema.create(body);

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 201,
         message: "Created !",
         ...tokens
      }
   }

   async getOneWarehouse(id: string, req: CustomeRequestInterface): Promise<ResponseWarehouseInterface> {
      if (!id) {
         throw new BadRequestException("", "id is required !");
      }
      if (!mongoose.isValidObjectId(id)) {
         throw new BadRequestException("", "id must be objectId !");
      }
      const findWarehouse = await this.warehouseSchema.findOne({ _id: new mongoose.Types.ObjectId(id), status: true })
      
      if (!findWarehouse) {
         throw new NotFoundException("", "not found")
      }
      const responseData = plainToInstance(ResponseWarehouseDto, findWarehouse)
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)


      return {
         status: 200,
         message: "ok",
         data: responseData,
         ...tokens
      }
   }

   async getAllWarehouse( req: CustomeRequestInterface): Promise<ResponseWarehouseInterface> {
   
      const findWarehouse = await this.warehouseSchema.find({ status: true })

      const responseData = plainToInstance(ResponseWarehouseDto, findWarehouse)
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)


      return {
         status: 200,
         message: "ok",
         data: responseData,
         ...tokens
      }
   }
}