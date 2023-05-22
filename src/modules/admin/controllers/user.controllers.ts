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
import { UserRepository } from 'src/repositories';
import { PaginateDto, userListSelect, userEditFieldList } from '../dtos';
import { User } from 'src/entities';
import { UserSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { ValidationFilter } from '../middleware';
import { hashPassword } from 'src/utils';

@Controller('/admin/user')
export class UserController extends AbaseManageController {
  protected key = 'user';
  protected repository = UserRepository;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, userListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    return super.create(res, req, userEditFieldList);
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, userEditFieldList);
  }

  @Post('/save')
  @UseFilters(ValidationFilter)
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: UserSaveDto) {
    if (!itemSaveDto.password) {
      delete itemSaveDto.password;
    } else {
      itemSaveDto.password = await hashPassword(itemSaveDto.password);
    }
    return super.save(res, req, itemSaveDto);
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id);
  }
}
