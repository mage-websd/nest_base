import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Req
} from '@nestjs/common';
import { Response } from 'express';
import { STATUS } from 'src/constants';
import { ChildRepository } from 'src/repositories';

@Controller('/api/child')
export class ChildController {

  @Get()
  async getAllChild(@Res() res: Response, @Req() req: Request) {
    const child = await ChildRepository.findBy({
      userId: res.locals.user.id,
      status: STATUS.enable
    });
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'done',
      data: {
        items: child
      }
    });
  }
}
