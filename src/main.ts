import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppLog } from './helpers/logs/applog';
import config from './config';
import { ValidationPipe } from '@nestjs/common';
import { TrimPipe } from './helpers/interceptors/trim-pipe';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    logger: new AppLog(),
  });

  app.useGlobalPipes(new TrimPipe());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(config.APP_PORT, () => {
    console.info(`--- 🚀 Server running on ${config.APP_PORT} ---`);
  });
}

bootstrap();
