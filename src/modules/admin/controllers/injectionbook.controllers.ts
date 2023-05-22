import {
  Controller,
  Res,
  Get,
  Req,
  Query,
  Param,
  Body,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { InjectionBookRepository } from 'src/repositories';
import { PaginateDto, ibListSelect, ibEditFieldList } from '../dtos';
import { InjectionBook } from 'src/entities';
import { InjectionBookSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { objEmptyToNull } from 'src/utils';
import { renderHtml } from '../utils';
import { ValidationFilter } from '../middleware';

@Controller('/admin/injectionbook')
export class InjectionBookController extends AbaseManageController {
  protected key = 'injectionbook';
  protected repository = InjectionBookRepository;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, ibListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    return super.create(res, req, ibEditFieldList, {
      isFormValidCustom: true,
      jsFooter: await renderHtml(res, 'pages-extend/injectionbook-footer'),
    });
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, ibEditFieldList, 'vacId', {
      isFormValidCustom: true,
      jsFooter: await renderHtml(res, 'pages-extend/injectionbook-footer'),
    });
  }

  @Post('/save')
  @UseFilters(ValidationFilter)
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: InjectionBookSaveDto) {
    return super.save(res, req, objEmptyToNull(itemSaveDto, ['userId', 'childId']));
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id, 'vacId');
  }
}
