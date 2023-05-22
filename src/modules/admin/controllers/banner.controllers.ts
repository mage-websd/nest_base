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
  UseFilters,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { BannerRepository } from 'src/repositories';
import { PaginateDto, bannerListSelect, bannerEditFieldList } from '../dtos';
import { Banner } from 'src/entities';
import { BannerSaveDto } from 'src/modules/abase/dto';
import { AbaseManageController } from './abase-manage.controllers';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerImage } from 'src/utils';
import { ValidationFilter } from '../middleware';

@Controller('/admin/banner')
export class BannerController extends AbaseManageController {
  protected key = 'banner';
  protected repository = BannerRepository;

  @Get()
  async index(@Res() res: Response, @Req() req: Request, @Query() query: PaginateDto) {
    return super.index(res, req, query, bannerListSelect);
  }

  @Get('/create')
  async create(@Res() res: Response, @Req() req: any) {
    return super.create(res, req, bannerEditFieldList, {isFormFile: true});
  }

  @Get('/:id')
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    super.edit(res, req, id, bannerEditFieldList, 'title', {isFormFile: true});
  }

  @Post('/save')
  @UseFilters(ValidationFilter)
  @UseInterceptors(FileInterceptor('image', multerImage({subpath: 'banner'})))
  async saveBanner(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: BannerSaveDto, @UploadedFile() file) {
    return super.save(res, req, itemSaveDto, {
      file: file,
    });
  }

  @Post('/delete/:id')
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    return super.delete(res, req, id, 'title');
  }
}
