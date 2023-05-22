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
import { ChildRepository } from 'src/repositories';
import { PaginateDto, childListSelect, childEditFieldList } from '../dtos';
import { Child } from 'src/entities';
import { ChildSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { ValidationFilter } from '../middleware';

@Controller('/admin/child')
export class ChildController extends AbaseManageController {
  protected key = 'child';
  protected repository = ChildRepository;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, childListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    return super.create(res, req, childEditFieldList);
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, childEditFieldList);
  }

  @Post('/save')
  @UseFilters(ValidationFilter)
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: ChildSaveDto) {
    return super.save(res, req, itemSaveDto);
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id);
  }
}
