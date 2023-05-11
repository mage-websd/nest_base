import {
  Controller,
  HttpStatus,
  Get
} from '@nestjs/common';
import config from 'src/config';

@Controller('/')
export class HomeController {

  @Get()
  async index() {
    return {
      status: HttpStatus.OK,
      message: 'done',
      env: config.APP_ENV
    }
  }
}
