import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { InternalServerErrorException } from "src/exceptions/internal-server-error.exceptoin";
import { CreateProductInterface, CustomeRequestInterface, ResponseInterface } from "src/interfaces";
import { Product } from "src/schemas/product.schemas";
import { ProductChild } from "src/schemas/product_child.schema";
import { GenerateToken } from "src/utils";


@Injectable()
export class ProductService {

   constructor(
      @InjectModel(Product.name) private readonly ProductSchema: Model<Product>,
      @InjectModel(ProductChild.name) private readonly ProductChildSchema: Model<ProductChild>,
      @InjectConnection()  private readonly TransactionConnecrion: Connection,
      private readonly generateToken: GenerateToken
   ) { }

   async create(body: CreateProductInterface, req: CustomeRequestInterface): Promise<ResponseInterface> {
      if (body.product_child && body.product_child.length > 0) {
         console.log("ifga tushib ketti")
         const childProduct = body.product_child;
         delete body.product_child;
         const session = await this.TransactionConnecrion.startSession();
         try {
            session.startTransaction()

            const [{_id}] = await this.ProductSchema.create([body], {session});

            for (const child of childProduct) {
                  child.parent_id = String(_id);
            }

            await this.ProductChildSchema.insertMany(childProduct, {session})
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
            throw new InternalServerErrorException( "", error)

         }
         finally {
            session.endSession()
         }

      }else {
         console.log('elsega tushib ketti')
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
}