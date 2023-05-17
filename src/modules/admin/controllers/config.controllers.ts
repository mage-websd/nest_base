import {
  Controller,
  Res,
  Get,
  Req,
  Query,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { paginatorNavFind, saveItem } from 'src/utils';
import { ConfigRepository } from 'src/repositories';
import { PaginateDto, configSearch, configSelect } from '../dtos';
import { Config } from 'src/entities';
import { ConfigSaveDto } from 'src/modules/abase/dto';

@Controller('/admin/config')
export class ConfigController {
  constructor() {}

  @Get()
  async index(@Res() res: Response,@Req() req: any, @Query() query: PaginateDto) {
    const errors = req.flash('errors');
    const dataList = await paginatorNavFind(ConfigRepository, query, configSearch, {select: configSelect});
    return res.render(
      'config/list',
        {
          errorsFlash: errors,
          title: 'Config list',
          menuActive: JSON.stringify(['config', 'config-list']),
          dataList: dataList
        }
    );
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    const item = new Config();
    return res.render(
      'config/edit',
        {
          title: 'Create Config',
          menuActive: JSON.stringify(['config', 'config-add']),
          item: item,
        }
    );
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    const infos = req.flash('infos');
    const item = await ConfigRepository.findOneBy({id: id});
    return res.render(
      'config/edit',
        {
          infosFlash: infos,
          title: 'Config ' + item.key,
          menuActive: JSON.stringify(['config']),
          item: item,
        }
    );
  }

  @Post('/save')
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: ConfigSaveDto) {
    const item = await saveItem(ConfigRepository, itemSaveDto);
    if (!item) {
      req.flash('errors', 'Not found config!!!');
      return res.redirect('/admin/config');
    }
    req.flash('infos', 'Save config success!');
    return res.redirect('/admin/config/' + item.id);
  }
}
