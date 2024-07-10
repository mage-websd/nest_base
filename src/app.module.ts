import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { modules } from './modules';
import DBsource from './config/db';
import { RequestLog } from './helpers/interceptors/request-log';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...DBsource.options,
      }),
    }),
    ...modules,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLog).forRoutes('*');
  }
}
