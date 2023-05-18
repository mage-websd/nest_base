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
import { TimelineRepository } from 'src/repositories';
import { PaginateDto, timelineListSelect, timelineEditFieldList } from '../dtos';
import { Timeline } from 'src/entities';
import { TimelineSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImage } from 'src/utils';

@Controller('/admin/timeline')
export class TimelineController extends AbaseManageController {
  protected key = 'timeline';
  protected repository = TimelineRepository;
  protected entity = Timeline;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, timelineListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response) {
    return super.create(res, timelineEditFieldList, {isFormFile: true});
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, timelineEditFieldList, 'title', {isFormFile: true});
  }

  @Post('/save')
  @UseInterceptors(FileInterceptor('image', multerImage({subpath: 'timeline'})))
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: TimelineSaveDto, @UploadedFile() file) {
    return super.save(res, req, itemSaveDto, {
      file: file,
    });
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id, 'title');
  }
}
