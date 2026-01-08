import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Connection, Model } from "mongoose";
import { ProductTypeEnum } from "src/enums";
import { InternalServerErrorException } from "src/exceptions/internal-server-error.exceptoin";
import { NotFoundException } from "src/exceptions/not-found.exception";
import { CreateChildProductInterface, CreateProductInterface, CustomeRequestInterface, ResponseForCreateChildProductInterface, ResponseForCreateProductInterface, ResponseInterface } from "src/interfaces";
import { Product } from "src/schemas/product.schemas";
import { ProductChild } from "src/schemas/product_child.schema";
import { GenerateToken } from "src/utils";
import { ResponseForCreateProductDto, ResponseProductDto } from "./dto/responseProduct.dto";
import { ResponseForCreateChildProductDto } from "./dto/responseChildProduct.dto";
import { plainToInstance } from "class-transformer";
import { CreateChildProductDto } from "./dto/createChildProduct.dto";


@Injectable()
export class ProductService {

   constructor(
      @InjectModel(Product.name) private readonly ProductSchema: Model<Product>,
      @InjectModel(ProductChild.name) private readonly ProductChildSchema: Model<ProductChild>,
      @InjectConnection() private readonly TransactionConnecrion: Connection,
      private readonly generateToken: GenerateToken
   ) { }

   async create(body: CreateProductInterface, req: CustomeRequestInterface): Promise<ResponseInterface> {
      if (body.product_child && body.product_child.length > 0) {
         
         const childProduct:CreateChildProductInterface[] = body.product_child;
         delete body.product_child;

         const session = await this.TransactionConnecrion.startSession();

         try {
            session.startTransaction()

            const [{ _id }] = await this.ProductSchema.create([body], { session });

            for (const child of childProduct) {
               child.parent_id = String(_id);
            }

            await this.ProductChildSchema.insertMany(childProduct, { session })
            await session.commitTransaction()

            const SECERT_KEY = process.env.AES_SECRET_KEY
            const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

            return {
               status: 201,
               message: "CREATED",
               ...tokens
            }
         } catch (error) {
            console.log("transaction error", error)
            await session.abortTransaction();
            throw new InternalServerErrorException("", error)

         }
         finally {
            session.endSession()
         }

      } else {
         await this.ProductSchema.create(body);
         const SECERT_KEY = process.env.AES_SECRET_KEY
         const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

         return {
            status: 201,
            message: "CREATED",
            ...tokens
         }
      }

   }

   async getOne(id: string, req: CustomeRequestInterface): Promise<ResponseInterface> {

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      const data = await this.ProductSchema.findOne({ _id: id, status: true }).lean();

      if (!data) {
         throw new NotFoundException("", "Product is not found");
      }
      const product: ResponseForCreateProductInterface = {
         id: data._id.toString(),
         ...data,
      }

      let childDtos;
      if (product.product_type == ProductTypeEnum.VARIANT) {
         childDtos = await this.ProductChildSchema.find({ parent_id: data._id.toString(), status: true }).lean()
         product.product_child = childDtos.map((child) => {
            child.id = child._id.toString()
            return plainToInstance(ResponseForCreateChildProductDto, child)
         })
      }


      
      const productDto = plainToInstance(ResponseForCreateProductDto, {
         ...product
      });

      const response = plainToInstance(ResponseProductDto, {
         status: 200,
         message: "OK",
         data: productDto,
         ...tokens
      })
      return response;
   }

   async getAll(req: CustomeRequestInterface):Promise<ResponseInterface> {
      let returningProducts = [];
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      let products = await this.ProductSchema.find({status: true})
      if (!products && products.length <= 0) {
         return {
            status: 200,
            message: "OK",
            data: returningProducts,
            ...tokens
         }
      }
      let parents = []
      let childs = []
      for (const product of products) {

         if (product.product_type == ProductTypeEnum.VARIANT) {

            childs = await this.ProductChildSchema.find({parent_id: product.id, status:true})
            childs.map( (child) => {
               return plainToInstance(ResponseForCreateChildProductDto, child)
            })
         }else if (product.product_type !== ProductTypeEnum.VARIANT) {
            parents.push(product)
         }
      }
      // console.log("products", parents)
      // console.log("cjhilds",childs)
      returningProducts = [...parents, ...childs]
         console.log(returningProducts)
      return {
         status: 200,
         message: "OK",
         data: returningProducts,
         ...tokens
      }
   }



}