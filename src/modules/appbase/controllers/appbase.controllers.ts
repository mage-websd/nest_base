import {
  Controller,
  Body,
  Post,
  Param,
  HttpStatus,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { AppBaseService } from '../services';
import { AppBaseDto } from '../dtos';

@Controller('report/collection')
export class AppBaseController {
  constructor(private appBaseService: AppBaseService) {}

  @Post('index')
  async index(@Res() res: Response, @Param('id') id: string, @Body() body: AppBaseDto) {
    await this.appBaseService.appbasetest();
    return res.status(HttpStatus.OK).json({
      "statusCode": HttpStatus.OK,
      "message": "done"
    });
  }
}
