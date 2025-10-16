import { Module } from '@nestjs/common';
import { authModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app/app.config';
import { ClientSchema } from './schemas/clients.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './config/db/database.module';

@Module({
  imports: [
    ConfigModule.forRoot( {
      load:[appConfig]
    }),
    DatabaseModule,
    authModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}