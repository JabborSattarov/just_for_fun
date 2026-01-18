import { Module } from "@nestjs/common";
import { WarehouseController } from "./warehouse.controller";
import { WarehouseService } from "./warehouse.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Warehouse, WarehouseSchema } from "src/schemas/warehouse.schema";
import { GenerateToken, OneTimeCode } from "src/utils";
import { Client, ClientSchema } from "src/schemas/clients.schemas";


@Module({
    imports:[
        MongooseModule.forFeature([
           { name: Warehouse.name, schema: WarehouseSchema },
           { name: Client.name, schema: ClientSchema },
        ])
     ],
   controllers:[WarehouseController],
   providers: [
      WarehouseService,
      GenerateToken,
      OneTimeCode,
   ]
})
export class WarehouseModule {}