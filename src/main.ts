import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExeptionFilter } from './filters';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from './exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExeptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints),
      }));
      return new BadRequestException({
        errors: formattedErrors,
      }, "Bad Request");
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
