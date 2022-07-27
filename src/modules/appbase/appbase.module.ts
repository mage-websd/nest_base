import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import config from 'src/config';
import { HttpModule } from '@nestjs/axios';
import { AppBaseService } from './services';
import { AppBaseController } from './controllers';
import { AuthApppBaseMiddleware } from './middleware';

@Module({
  controllers: [AppBaseController],
  providers: [AppBaseService],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 60000,
        maxRedirects: 5,
        baseURL: config.AI_URL,
      }),
    }),
  ],
})
export class AppBaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthApppBaseMiddleware).forRoutes(AppBaseController);
  }
}
