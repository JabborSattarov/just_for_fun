import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { SubCategoryService } from "./sub-caterogory.service";
import { CustomeRequestInterface } from "src/interfaces";
import { CreateSubCategoryDto, deleteSubCategoryDto } from "./dto";
import { CheckTokenGuard } from "src/guards/check-token.guard";
import { CheckRoleGuard } from "src/guards/check-role.guard";

@Controller("sub_category")
export class SubCategoryController {
   #_service: SubCategoryService;
   constructor(sub_category_servise: SubCategoryService) {
      this.#_service = sub_category_servise
   }


   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )

   @Post("create/:id")
   createSubCategory(@Param() param:deleteSubCategoryDto,  @Body() body: CreateSubCategoryDto, @Req() req: CustomeRequestInterface): Promise<any> {
      return this.#_service.createSubCategory(param, body, req)
   }
}