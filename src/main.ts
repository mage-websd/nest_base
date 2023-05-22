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
import * as hbs from 'hbs';
import * as flash from 'connect-flash';
import { AppModule } from './app.module';
import config from './config';
import { LogService } from './utils/logs/log.service';
import { hbsHelper } from './utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LogService(),
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(
    session({
      secret: "shop1",
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.useStaticAssets(join(config.basedir, 'public'));
  app.setBaseViewsDir(join(config.srcdir, 'views', 'admin'));
  app.setViewEngine('hbs');
  app.set('view options', { 
    layout: 'layout/default',
  });
  hbs.registerPartials(join(config.srcdir, 'views', 'admin', 'partials'));
  hbsHelper();
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });
  await app.listen(config.PORT_ADMIN ?? config.PORT, () => {
    console.info(`--- 🚀 Server admin running on ${config.PORT_ADMIN ?? config.PORT} ---`);
  });
}
bootstrap();
