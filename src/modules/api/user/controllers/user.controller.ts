import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Req
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/api/user')
export class UserController {

  @Get('')
  async info(@Res() res: Response, @Req() req: Request) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'done',
      data: {
        item: res.locals.user
      }
    });
  }
}
