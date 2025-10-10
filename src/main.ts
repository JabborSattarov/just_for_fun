import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config =  app.get(ConfigService)
  const host = config.getOrThrow("app.host");
  const port = config.getOrThrow("app.port")
  await app.listen(port, host, ()=> console.log(port , "is runned"));
}
bootstrap();
