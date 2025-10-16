import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminSeederService } from "./database.service";
import { Client, ClientSchema } from "src/schemas/clients.schemas";

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/warehouse";
console.log(dbURL);

@Global()
@Module({
   imports: [
      MongooseModule.forRoot(String(dbURL), {
         dbName: "warehouse"
      }),
      MongooseModule.forFeature([{name: Client.name, schema: ClientSchema}])
   ],
   providers: [AdminSeederService],
   exports: [MongooseModule]
})
export class DatabaseModule {}