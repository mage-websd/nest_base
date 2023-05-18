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
import { Response, Request } from 'express';
import { UserRepository } from 'src/repositories';
import { PaginateDto, userListSelect, userEditFieldList } from '../dtos';
import { User } from 'src/entities';
import { UserSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';

@Controller('/admin/user')
export class UserController extends AbaseManageController {
  protected key = 'user';
  protected repository = UserRepository;
  protected entity = User;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, userListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response) {
    return super.create(res, userEditFieldList);
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, userEditFieldList);
  }

  @Post('/save')
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: UserSaveDto) {
    return super.save(res, req, itemSaveDto);
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id);
  }
}
