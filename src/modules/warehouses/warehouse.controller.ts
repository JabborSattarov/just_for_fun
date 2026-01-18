import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { CreateClientInterface, CustomeRequestInterface } from "src/interfaces";
import { CreateWarehouseDto } from "./dto/createDto";
import { ResponseWarehouseInterface } from "src/interfaces/warehouse.interface";
import { CheckTokenGuard } from "src/guards";


@Controller("warehouse")
export class WarehouseController {

   constructor(
      private readonly service: WarehouseService
   ){}

   @Post("create")
   @UseGuards(CheckTokenGuard)
   async createWarehouse(@Body() body: CreateWarehouseDto, @Req() req: CustomeRequestInterface): Promise<ResponseWarehouseInterface> {
      return this.service.createWarehouse(body, req)
   }
   @Post("get")
   @UseGuards(CheckTokenGuard)
   async getAllWarehouse( @Req() req: CustomeRequestInterface): Promise<ResponseWarehouseInterface> {
      return this.service.getAllWarehouse( req)
   }
   @Post("get/:id")
   @UseGuards(CheckTokenGuard)
   async getWarehouse( @Param() id: string,  @Req() req: CustomeRequestInterface): Promise<ResponseWarehouseInterface> {
      return this.service.getOneWarehouse(id, req)
   }
}
