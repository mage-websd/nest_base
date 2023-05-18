import {
  Controller,
  Res,
  Get,
  Req,
  Query,
  Param,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { NoticationRepository } from 'src/repositories';
import { PaginateDto, notificationListSelect, notificationEditFieldList } from '../dtos';
import { Notification } from 'src/entities';
import { NotificationSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { multerImage } from 'src/utils';

@Controller('/admin/notification')
export class NotificationController extends AbaseManageController {
  protected key = 'notification';
  protected repository = NoticationRepository;
  protected entity = Notification;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, notificationListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response) {
    return super.create(res, notificationEditFieldList, {isFormFile: true});
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, notificationEditFieldList, 'title', {isFormFile: true});
  }

  @Post('/save')
  @UseInterceptors(FileInterceptor('image', multerImage({subpath: 'noti'})))
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: NotificationSaveDto, @UploadedFile() file) {
    return super.save(res, req, itemSaveDto, {
      file: file,
    });
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id, 'title');
  }
}
