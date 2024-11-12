import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppLog } from './helpers/logs/applog';
import config from './config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { TrimPipe } from './helpers/interceptors/trim-pipe';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    logger: new AppLog(),
  });

  app.useGlobalPipes(new TrimPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            errors: Object.values(error.constraints),
          })),
        );
      },
    }),
  );
  app.enableCors();

  await app.listen(config.APP_PORT, () => {
    console.info(`--- 🚀 Server running on ${config.APP_PORT} ---`);
  });
}

bootstrap();
