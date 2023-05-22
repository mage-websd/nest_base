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
import { ConfigRepository } from 'src/repositories';
import { PaginateDto, configListSelect, configEditFieldList } from '../dtos';
import { Config } from 'src/entities';
import { ConfigSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { ValidationFilter } from '../middleware';

@Controller('/admin/config')
export class ConfigController extends AbaseManageController {
  protected key = 'config';
  protected repository = ConfigRepository;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, configListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    return super.create(res, req, configEditFieldList);
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, configEditFieldList, 'key');
  }

  @Post('/save')
  @UseFilters(ValidationFilter)
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: ConfigSaveDto) {
    return super.save(res, req, itemSaveDto);
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id, 'key');
  }
}
