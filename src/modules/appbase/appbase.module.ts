import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppBaseService } from './services';
import { AppBaseController } from './controllers';
import { AuthApppBaseMiddleware } from './middleware';

@Module({
  controllers: [AppBaseController],
  providers: [AppBaseService],
  imports: [
  ],
})
export class AppBaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthApppBaseMiddleware).forRoutes(AppBaseController);
  }
}
