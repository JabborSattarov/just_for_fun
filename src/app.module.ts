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
import { ItemsModule } from './modules/items/item.module';
import { CategoryModule } from './modules/categoryes/categoryes.module';

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/warehouse";

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
    MailerModule.forRoot(mailerModuleOptions),
    AuthModule,
    ClientModule,
    ItemsModule,
    RefershTokenModule,
    CategoryModule
  ],
  controllers: [],
  providers: [AdminSeederService, SendMail],
})
export class AppModule {}