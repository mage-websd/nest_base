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
import { UserRepository } from 'src/repositories';
import { PaginateDto, UserSaveDto, userSearch, userSelect } from '../dtos';
import { User } from 'src/entities';
import { GENDER } from 'src/constants';

@Controller('/admin/user')
export class UserController {
  constructor() {}

  @Get()
  async index(@Res() res: Response,@Req() req: any, @Query() query: PaginateDto) {
    const errors = req.flash('errors');
    const dataList = await paginatorNavFind(UserRepository, query, userSearch, {select: userSelect});
    return res.render(
      'user/list',
        {
          errorsFlash: errors,
          title: 'User list',
          menuActive: JSON.stringify(['user', 'user-list']),
          dataList: dataList
        }
    );
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    const item = new User();
    return res.render(
      'user/edit',
        {
          title: 'Thêm User',
          menuActive: JSON.stringify(['user', 'user-add']),
          item: item,
          gender: GENDER
        }
    );
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    const infos = req.flash('infos');
    const item = await UserRepository.findOneBy({id: id});
    return res.render(
      'user/edit',
        {
          infosFlash: infos,
          title: 'User ' + item.name,
          menuActive: JSON.stringify(['user']),
          item: item,
          gender: GENDER
        }
    );
  }

  @Post('/save')
  async save(@Res() res: Response, @Req() req: any, @Body() userSaveDto: UserSaveDto) {
    const item = await saveItem(UserRepository, userSaveDto);
    if (!item) {
      req.flash('errors', 'Not found user!!!');
      return res.redirect('/admin/user');
    }
    req.flash('infos', 'Save user success!');
    return res.redirect('/admin/user/' + item.id);
  }
}
