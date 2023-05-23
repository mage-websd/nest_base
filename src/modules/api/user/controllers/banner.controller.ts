import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Req,
  Param
} from '@nestjs/common';
import { Response } from 'express';
import { STATUS } from 'src/constants';
import { BannerRepository } from 'src/repositories';
import { itemsRenderImgUrl } from 'src/utils';

@Controller('/api/banner')
export class BannerController {

  @Get()
  async all(@Res() res: Response, @Req() req: Request) {
    let items = await BannerRepository.find({
      select: ['title', 'desc', 'image'],
      where: {
        status: STATUS.enable
      }
    });
    items = itemsRenderImgUrl(items);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'done',
      data: {
        items: items
      }
    });
  }
}
