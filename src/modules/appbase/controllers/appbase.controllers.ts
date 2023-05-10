import {
  Controller,
  Body,
  Post,
  Param,
  HttpStatus,
  Res,
  Get
} from '@nestjs/common';
import { Response } from 'express';
import { AppBaseService } from '../services';
import { AppBaseDto } from '../dtos';

@Controller('/')
export class AppBaseController {
  constructor(private appBaseService: AppBaseService) {}

  @Get()
  async index() {
    return {
      status: HttpStatus.OK,
      message: 'done',
    }
  }

  @Post('index')
  async postIndex(@Res() res: Response, @Param('id') id: string, @Body() body: AppBaseDto) {
    await this.appBaseService.appbasetest();
    return res.status(HttpStatus.OK).json({
      "statusCode": HttpStatus.OK,
      "message": "done"
    });
  }
}
