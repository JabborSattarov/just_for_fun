import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductInterface, CustomeRequestInterface, ResponseInterface } from "src/interfaces";
import { CheckTokenGuard } from "src/guards/check-token.guard";
import { ProductValidationPipe } from "src/pipes";


@Controller("product")
export class ProductController {

    constructor(private readonly service: ProductService) { }

    @UseGuards(CheckTokenGuard)
    @UsePipes(ProductValidationPipe)
    @Post("create")
    async createProduct(@Body() body: CreateProductInterface, @Req() req: CustomeRequestInterface): Promise<ResponseInterface> {
        return this.service.create(body, req)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CheckTokenGuard)
    @Get("get_one/:id")
    async getOneProduct(@Param("id") id: string, @Req() req: CustomeRequestInterface):Promise<ResponseInterface> {
        return this.service.getOne(id, req)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(CheckTokenGuard)
    @Get("get_all")
    async getAllProduct(@Req() req: CustomeRequestInterface): Promise<ResponseInterface> {
        return this.service.getAll(req)
    }
}