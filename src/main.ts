/**
 * init env run admin area
 */
process.env.RUN_ONLY_AREA='admin';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from "express-session";
import * as passport from "passport";
import { join } from 'path';
import { AppModule } from './app.module';
import config from './config';
import CORS_SITE from './config/cros';
import { LogService } from './utils/logs/log.service';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LogService(),
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(CORS_SITE);
  app.use(
    session({
      secret: "shop1",
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());

  app.useStaticAssets(join(config.basedir, 'public'));
  app.setBaseViewsDir(join(config.srcdir, 'views', 'admin'));
  app.setViewEngine('hbs');
  app.set('view options', { 
    layout: 'layout/default',
   });
   hbs.registerPartials(join(config.srcdir, 'views', 'admin', 'partials'));

  await app.listen(config.PORT, () => {
    console.info(`--- 🚀 Server running on ${config.PORT} ---`);
  });
}
bootstrap();
