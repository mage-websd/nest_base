import { Module } from '@nestjs/common';
import { SenderController } from './controllers/sender.controller';
import { SenderService } from './services/sender.service';
import { ConsumerService } from './services/consumer.service';

@Module({
  imports: [],
  controllers: [SenderController],
  providers: [SenderService, ConsumerService],
})
export class RabbitmqModule {}
