import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Req,
  Query
} from '@nestjs/common';
import { Response } from 'express';
import { STATUS } from 'src/constants';
import { PaginateDto } from 'src/modules/admin/dtos';
import { TimelineRepository } from 'src/repositories';
import { itemsRenderImgUrl, paginatorNavFind } from "src/utils";

@Controller('/api/timeline')
export class TimelineController {

  @Get()
  async get(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    console.log(11111, query);
    query['userId'] = res.locals.user.id;
    query['status'] = STATUS.enable;
    const items = await paginatorNavFind(TimelineRepository, query, {
      userId: {
        search: '=',
      },
      status: {
        search: '='
      }
    }, {
      order: {
        date: "DESC",
      },
    });
    items.items = itemsRenderImgUrl(items.items);
    console.log(items);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'done',
      data: items
    });
  }
}
