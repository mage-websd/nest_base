import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport"
import { AuthService } from './services';
import { AuthFilter, LocalStrategy, AuthMiddleware } from './middleware';
import {
  AuthController,
  UserController,
  DashboardController,
  ConfigController,
  BannerController,
  VacxinController,
  TimelineController,
  ChildController,
  NotificationController,
  InjectionBookController
} from './controllers';
import { LocalAuthGuard, AuthenticatedGuard } from './guards';
import { SessionSerializer } from './utils';

@Module({
  controllers: [
    AuthController,
    UserController,
    DashboardController,
    ConfigController,
    BannerController,
    VacxinController,
    TimelineController,
    ChildController,
    NotificationController,
    InjectionBookController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    AuthenticatedGuard,
    SessionSerializer,
    AuthFilter,
  ],
  imports: [
    PassportModule.register({ session: true })
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes(
        DashboardController,
        UserController,
        ConfigController,
        BannerController,
        VacxinController,
        TimelineController,
        ChildController,
        NotificationController,
        InjectionBookController,
      );
  }
}
