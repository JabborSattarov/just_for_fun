import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { BadRequestException } from "src/exceptions";
import { CreateCategoryInterface, CreateCategoryResponseInterface, CustomeRequestInterface, DeleteCategoryInterface } from "src/interfaces";
import { Category } from "src/schemas/category.schemas";
import { GenerateToken } from "src/utils";
import { deleteCategoryDto } from "./dto";

@Injectable()
export class CategoryService {
   constructor(
      @InjectModel(Category.name) private CategorySchema: Model<Category>,
      private generateToken: GenerateToken,

   ) { }

   async createCategory(body: CreateCategoryInterface, req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface> {

      await this.CategorySchema.create(body)
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "Category successfully created !",
         ...tokens
      }

   }
   async deleteCategory(param: deleteCategoryDto, req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface> {
      if (!param.id) {
         throw new BadRequestException("", "id is required !");
      }
      if (!mongoose.isValidObjectId(param.id)) {
         throw new BadRequestException("", "id must be objectId !");
      }
      await this.CategorySchema.findOneAndUpdate({ _id: param.id, status: true }, { status: false })

      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "Category successfully deleted !",
         ...tokens
      }

   }
   async getAllCategory(req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface> {
      const categoryes = await this.CategorySchema.find({ status: true });
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "OK !",
         data: categoryes,
         ...tokens
      }
   }

   async getOneCategory(param: DeleteCategoryInterface, req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface> {

      if (!param && !param.id) {
         throw new BadRequestException("", "id is required !");
      }
      if (!mongoose.isValidObjectId(param.id)) {
         throw new BadRequestException("", "id must be objectId !");
      }
      const category = await this.CategorySchema.findOne({ _id: new mongoose.Types.ObjectId(param.id), status: true })
      const SECERT_KEY = process.env.AES_SECRET_KEY
      const tokens = await this.generateToken.signPayload({ id: req.decode.id, role: req.decode.role }, SECERT_KEY)

      return {
         status: 200,
         message: "OK !",
         data: category,
         ...tokens
      }
   }
}