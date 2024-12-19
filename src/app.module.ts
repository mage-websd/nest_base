import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { modules } from './modules';
import DBsource from './config/db';
import { RequestLog } from './helpers/interceptors/request-log';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...DBsource.options,
      }),
    }),
    ScheduleModule.forRoot(),
    ...modules,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLog).forRoutes('*');
  }
}
