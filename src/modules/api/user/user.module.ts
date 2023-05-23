import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  AuthController,
  HomeController,
  UserController,
  ChildController,
  TimelineController,
  ConfigController,
  BannerController
} from './controllers';
import { AuthApiMiddleware } from './middleware/auth.mdw';


@Module({
  controllers: [
    HomeController,
    AuthController,
    UserController,
    ChildController,
    TimelineController,
    ConfigController,
    BannerController
  ],
  providers: [
  ],
  imports: [
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthApiMiddleware)
      .forRoutes(
        UserController,
        ChildController,
        TimelineController,
        ConfigController,
        BannerController,
        
      );
  }
}
