import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSubCategoryInterface, CreateSubCategoryResponseInterface, CustomeRequestInterface, DeleteSubCategoryInterface } from "src/interfaces";
import { SubCategory } from "src/schemas/sub-category.schema";
import { GenerateToken } from "src/utils";

@Injectable()
export class SubCategoryService {
   constructor(
      @InjectModel(SubCategory.name) private subcategorySchema: Model<SubCategory>,
      private readonly generateToken: GenerateToken
   ){}
   
   async createSubCategory(param: DeleteSubCategoryInterface ,body: CreateSubCategoryInterface, req: CustomeRequestInterface): Promise<CreateSubCategoryResponseInterface> {
      
      await this.subcategorySchema.create({category_id: param.id ,...body})
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "Category successfully created !",
         ...tokens
      }
   }
}