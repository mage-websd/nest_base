import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import CORS_SITE from './config/cros';
import { LogService } from './utils/logs/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LogService(),
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(CORS_SITE);

  await app.listen(config.PORT, () => {
    console.info(`--- 🚀 Server running on ${config.PORT} ---`);
  });
}
bootstrap();
