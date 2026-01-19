import { Module } from '@nestjs/common';
import { AuthModule, } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './modules/clients/clients.module';
import { Client, ClientSchema } from './schemas/clients.schemas';
import { Permissions, PermissionSchema } from './schemas/permissions.schema';
import { AdminSeederService } from './app.service';
import { mailerModuleOptions } from './config/mailer/mailer.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMail } from './utils';
import { RefershTokenModule } from './modules/refresh-token/refresh-token.module';
import { ProductModule } from './modules/products/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WarehouseModule } from './modules/warehouses/warehouse.module';
import { SalesModule } from './modules/sales/sales.module';

const dbURL = process.env.DB_URL || "mongodb://localhost:27017/warehouse?replicaSet=rs0";
console.log(dbURL)
@Module({
  imports: [
    MongooseModule.forRoot(String(dbURL), {
      retryAttempts: 1,
      dbName: "warehouse",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'doc'), 
      serveRoot: '/doc',                      
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true
    }),
    MongooseModule.forFeature([
      {name: Client.name, schema: ClientSchema},
      {name: Permissions.name, schema: PermissionSchema }
    ]),
    MailerModule.forRoot(mailerModuleOptions),
    AuthModule,
    ClientModule,
    ProductModule,
    WarehouseModule,
    SalesModule,
    RefershTokenModule
  ],
  controllers: [],
  providers: [AdminSeederService, SendMail],
})
export class AppModule {}