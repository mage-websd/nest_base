import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  constructor() {}

  @Get()
  home(): string {
    return 'home';
  }

  @Get('healthcheck')
  viewhealthCheck(): string {
    return 'ok';
  }
}
