import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CustomeRequestInterface, ResponseInterface } from "src/interfaces";
import { CreateSalesDto } from "./dto/create.dto";
import { CheckTokenGuard } from "src/guards";

@Controller("sales")
export class SalesController {

   constructor(
      private readonly service: SalesService
   ) { }

   @Post("/create")
   @UseGuards(CheckTokenGuard)
   async createSales(@Body() body: CreateSalesDto, @Req() req: CustomeRequestInterface): Promise<ResponseInterface> {
      return this.service.createSales(body, req)
   }

   @Get("/get")
   @UseGuards(CheckTokenGuard)
   async getAllSales(@Req() req: CustomeRequestInterface): Promise<ResponseInterface> {
      return this.service.getAllSales(req)
   }

   @Get("/get/:id")
   @UseGuards(CheckTokenGuard)
   async getOneSales(@Param() id: string, @Req() req: CustomeRequestInterface): Promise<ResponseInterface> {
      return this.service.getOneSales(id, req)
   }

   @Get("/accept/:id")
   @UseGuards(CheckTokenGuard)
   async acceptSales(@Param() id: string, @Req() req: CustomeRequestInterface): Promise<ResponseInterface> {
      return this.service.acceptSales(id, req)
   }

   @Get("/reject/:id")
   @UseGuards(CheckTokenGuard)
   async rejectSales(@Param() id: string, @Req() req: CustomeRequestInterface): Promise<ResponseInterface> {
      return this.service.rejectSales(id, req)
   }
}