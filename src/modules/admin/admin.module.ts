import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport"
import { AuthService, LocalStrategy } from './services';
import { AuthController, HomeController } from './controllers';
import { AuthApppBaseMiddleware } from './middleware';
import { LocalAuthGuard, AuthenticatedGuard } from './guards';
import { SessionSerializer } from './utils';

@Module({
  controllers: [
    AuthController,
    HomeController
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    AuthenticatedGuard,
    SessionSerializer
  ],
  imports: [
    PassportModule.register({ session: true })
  ],
})
export class AdminModule {}

/**implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthApppBaseMiddleware).forRoutes(AuthController);
  }
}*/
