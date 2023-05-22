import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HomeController } from './controllers';


@Module({
  controllers: [
    HomeController
  ],
  providers: [
    
  ],
  imports: [
  ],
})
export class UserModule{}
/* implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes(
       
      );
  }
}
*/
