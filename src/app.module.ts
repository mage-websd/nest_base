import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppBaseModule } from 'src/modules/appbase/appbase.module';
import { ScheduleJobModule } from './modules/schedule-job/schedule-job.module';

@Module({
  imports: [AppBaseModule, ScheduleModule.forRoot(), ScheduleJobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
