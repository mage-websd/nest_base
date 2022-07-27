import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { logInfo } from 'src/provides/log.provide';

@Injectable()
export class ScheduleService {

  @Cron('30 7 * * *')
  async getDataIntoReport() {
    logInfo('Run cron get data craw everyday');
    // TODO
    logInfo('Run cron get data craw everyday - done');
  }
}
