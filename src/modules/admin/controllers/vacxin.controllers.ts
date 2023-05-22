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
import { VacxinRepository } from 'src/repositories';
import { PaginateDto, vacxinListSelect, vacxinEditFieldList } from '../dtos';
import { Vacxin } from 'src/entities';
import { VacxinSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { ValidationFilter } from '../middleware';

@Controller('/admin/vacxin')
export class VacxinController extends AbaseManageController {
  protected key = 'vacxin';
  protected repository = VacxinRepository;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, vacxinListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    return super.create(res, req, vacxinEditFieldList);
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, vacxinEditFieldList);
  }

  @Post('/save')
  @UseFilters(ValidationFilter)
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: VacxinSaveDto) {
    return super.save(res, req, itemSaveDto);
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id);
  }
}
