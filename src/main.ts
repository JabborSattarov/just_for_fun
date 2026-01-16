import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExeptionFilter } from './filters';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from './exceptions';
import { formatErrors } from './utils/error.formater';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExeptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      return new BadRequestException({
        errors: formatErrors(errors),
      });
    },
  }))

  app.enableCors({
    origin: '*',
    credentials: true
  });

  const config = app.get(ConfigService)
  const host = config.getOrThrow("app.host");
  const port = config.getOrThrow("app.port")
  await app.listen(port, host, () => console.log(port, "is runned"));
}
bootstrap();
