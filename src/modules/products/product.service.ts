import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { ProductTypeEnum } from "src/enums";
import { InternalServerErrorException } from "src/exceptions/internal-server-error.exceptoin";
import { CreateProductInterface, CustomeRequestInterface, ResponseForCreateProductInterface, ResponseInterface } from "src/interfaces";
import { Product } from "src/schemas/product.schemas";
import { GenerateToken } from "src/utils";
import { ResponseForCreateProductDto, ResponseProductDto } from "./dto/responseProduct.dto";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "src/exceptions";

@Injectable()
export class ProductService {

   constructor(
      @InjectModel(Product.name) private readonly ProductSchema: Model<Product>,
      @InjectConnection() private readonly TransactionConnection: Connection,
      private readonly generateToken: GenerateToken
   ) { }

   async createNewProduct(body: CreateProductInterface, req: CustomeRequestInterface): Promise<ResponseInterface> {
      const checkForUniqueSKU = await this.ProductSchema.findOne({product_sku: body.product_sku, status: true})
      if (checkForUniqueSKU) {
         throw new BadRequestException(body.product_sku, "Sku must be unique!")
      }
      const session = await this.TransactionConnection.startSession();
      if (!Object.keys(body).includes("product_child")) {
         const newProduct = await this.ProductSchema.create(body);

         const SECERT_KEY = process.env.AES_SECRET_KEY
         const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)
         return {
            status: 201,
            message: "Successfuly Created !",
            ...tokens
         }
      } else {
         try {
            session.startTransaction()

            const childs = body?.product_child
            delete body.product_child

            const [newProduct] = await this.ProductSchema.create([body], { session });
            console.log("created prodiuct", newProduct)

            for (let i = 0; i < childs.length; i++) {
               let child = childs[i];
               const checkForUniqueSKU = await this.ProductSchema.findOne({ product_sku: child.product_sku, status: true })
               if (checkForUniqueSKU) {
                  throw new BadRequestException(child.product_sku, "Sku must be unique!")
               }
               child.parent_id = newProduct.id;
            }

            console.log("that is childs", childs)
            await this.ProductSchema.insertMany(childs, { session });
            console.log("error alredy")
            const SECERT_KEY = process.env.AES_SECRET_KEY
            const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

            await session.commitTransaction();
            return {
               status: 201,
               message: "Successfuly Created !",
               ...tokens
            }
         } catch (error) {
            console.log(error);

            await session.abortTransaction();
            throw new InternalServerErrorException(
               error,
               "transaction has failed!"
            );
         } finally {
            session.endSession()
         }
      }
   }

   async getOneProduct(id: string, req: CustomeRequestInterface): Promise<ResponseInterface> {

      const findProducts = await this.ProductSchema.find({ $or: [{ _id: id }, { parent_id: id }], status: true }).lean();
      let returningData: ResponseForCreateProductInterface;
      let childs: ResponseForCreateProductInterface[] = [];
      for (let i = 0; i < findProducts.length; i++) {
         const product = findProducts[i];
         if (product.product_type == ProductTypeEnum.VARIANT_PARENT) {
            console.log("if");
            
            returningData = {
               ...product,
               product_child: []
            }
            for (let j = 0; j < findProducts.length; j++) {
               const child = findProducts[j];
               if (child.product_type == ProductTypeEnum.VARIANT_CHILD) {
                  childs.push(child)
               }
            }
            returningData.product_child = childs;
            break
         }else {
            returningData = findProducts[0];
         }
      }

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)
      const productReturningDto = plainToInstance(ResponseForCreateProductDto, returningData)
      return plainToInstance(ResponseProductDto, {
         status: 200,
         message: "ok",
         data: productReturningDto ? productReturningDto : {},
         // data: returningData,
         ...tokens
      })
   }

}