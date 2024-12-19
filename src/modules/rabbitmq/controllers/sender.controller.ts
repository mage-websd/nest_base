import { Controller, Get } from '@nestjs/common';
import { SenderService } from '../services/sender.service';

@Controller('rabbitmq/sender')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Get('/')
  public async sender() {
    return this.senderService.sender();
  }

  @Get('/exchange')
  public async exchange() {
    return this.senderService.senderExchange();
  }

  @Get('/broadcast')
  public async broadcase() {
    return this.senderService.senderBroadcast();
  }
}
