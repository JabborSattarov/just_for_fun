import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CategoryService } from "./categoryes.service";
import { CreateCategoryResponseInterface, CustomeRequestInterface } from "src/interfaces";
import { CreateCategoryDto, deleteCategoryDto } from "./dto";
import { CheckTokenGuard } from "src/guards/check-token.guard";
import { CheckRoleGuard } from "src/guards/check-role.guard";
import { Roles } from "src/decorators";

@Controller("category")
export class CategoryController {
   #_service: CategoryService;
   constructor(categoryService: CategoryService ) {
      this.#_service = categoryService;
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )
   @Roles("admin")
   @Post("create")
   createCategory (@Body() body: CreateCategoryDto , @Req() req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface> {
      return this.#_service.createCategory(body, req)
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )
   @Roles("admin")
   @Delete("delete/:id")
   deleteCategory(@Param() param: deleteCategoryDto, @Req() req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface> {
      return this.#_service.deleteCategory(param, req)
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )
   @Roles("admin", "manager", "user")
   @Get("/all")
   getAll(@Req() req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface> {
      return this.#_service.getAllCategory(req)
   }

   @UseGuards(
      CheckTokenGuard,
      CheckRoleGuard
   )
   @Roles("admin", "manager", "user")
   @Get("get/:id")
   getOne( @Param() param: deleteCategoryDto, @Req() req: CustomeRequestInterface): Promise<CreateCategoryResponseInterface>  {
      return this.#_service.getOneCategory(param , req)
   }
}