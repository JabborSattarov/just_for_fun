import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { SubCategoryService } from "./sub-caterogory.service";
import { CustomeRequestInterface } from "src/interfaces";
import { CreateSubCategoryDto } from "./dto";

@Controller("sub_category")
export class SubCategoryController {
   #_service: SubCategoryService;
   constructor( sub_category_servise : SubCategoryService){
      this.#_service = sub_category_servise
   }
   

   @UseGuards()
   @Post("create")
   createSubCategory(@Body() body: CreateSubCategoryDto , @Req() req: CustomeRequestInterface) : Promise<any> {
      return this.#_service.createSubCategory(body, req)
   }
}