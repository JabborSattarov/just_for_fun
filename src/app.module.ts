import { Module } from '@nestjs/common';
import { authModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './modules/clients/clients.module';
import { Client, ClientSchema } from './schemas/clients.schemas';
import { Permissions, PermissionSchema } from './schemas/permissions.schema';
import { AdminSeederService } from './app.service';

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/warehouse";
console.log();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true
    }),
    MongooseModule.forRoot(String(dbURL), {
      dbName: "warehouse"
    }),
    MongooseModule.forFeature([
      {name: Client.name, schema: ClientSchema},
      {name: Permissions.name, schema: PermissionSchema }
    ]),
    authModule,
    ClientModule
  ],
  controllers: [],
  providers: [AdminSeederService],
})
export class AppModule { }