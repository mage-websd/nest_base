import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Req,
  Param
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigRepository } from 'src/repositories';

@Controller('/api/config')
export class ConfigController {

  @Get('get/:key')
  async get(@Res() res: Response, @Req() req: Request, @Param('key') key: string) {
    const item = await ConfigRepository.findOneBy({
      key: key
    });
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'done',
      data: {
        value: item?.value
      }
    });
  }

  @Get()
  async all(@Res() res: Response, @Req() req: Request) {
    let items = await ConfigRepository.find({
      select: ['key', 'value']
    });
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'done',
      data: {
        items: items
      }
    });
  }
}
