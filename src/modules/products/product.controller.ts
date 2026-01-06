import { Body, Controller, Patch, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductInterface, CustomeRequestInterface, ResponseInterface } from "src/interfaces";
import { CheckTokenGuard } from "src/guards/check-token.guard";
import { ProductValidationPipe } from "src/pipes";


@Controller("product")
export class ProductController {
   
   constructor(private readonly service: ProductService) {}

   @UseGuards(CheckTokenGuard)
   @UsePipes(ProductValidationPipe)
   @Post("create")
   async createProduct (@Body() body: CreateProductInterface, @Req() req: CustomeRequestInterface) : Promise<ResponseInterface> {
       return this.service.create(body, req) 
   }


   @Patch("update")
   async updateProduct() {
      
   }
}