import {
  Res,
  Req,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { paginatorNavFind, saveItem } from 'src/utils';
import { PaginateDto } from '../dtos';
import { Repository } from 'typeorm';

class OptionSearch {
  [key:string]: string;
}
class OptionSelect {
  [key:string]: boolean;
}

export class OptionsList {
  searchCol: OptionSearch;
  selectCol: OptionSelect
}

export class AbaseManageController {
  protected key = 'user';
  protected repository: Repository<any>;
  protected entity: any;
  protected dataResMore = {};

  constructor() {}

  /**
   * @Get()
   */
  async index(@Res() res: Response, @Req() req: any, @Query() query: PaginateDto, options: OptionsList) {
    const dataList = await paginatorNavFind(this.repository, query, options.searchCol, {select: options.selectCol});
    return res.render(
      `${this.key}/list`,
        {
          errorsFlash: req.flash('errors'),
          infosFlash: req.flash('infos'),
          title: `${this.key} list`,
          menuActive: JSON.stringify([this.key, `${this.key}-list`]),
          dataList: dataList
        }
    );
  }

  /**
   * @Get('/create')
   */
  async create(@Res() res: Response) {
    const item = new this.entity();
    return res.render(
      `${this.key}/edit`,
        {...{
          title: `create ${this.key}`,
          menuActive: JSON.stringify([this.key, `${this.key}-add`]),
          item: item
        },...this.dataResMore}
    );
  }

  /**
   * @Get('/:id')
   */
  async edit(@Res() res: Response, @Req() req: any, @Param('id') id: number) {
    const infos = req.flash('infos');
    const item = await this.repository.findOneBy({id: id});
    return res.render(
      `${this.key}/edit`,
        {...{
          infosFlash: infos,
          title: `${this.key} ${item.name}`,
          menuActive: JSON.stringify([this.key]),
          item: item,
        },...this.dataResMore}
    );
  }

  /**
   * @Post('/save')
   */
  async save(@Res() res: Response, @Req() req: any, @Body() itemSaveDto: any) {
    const item = await saveItem(this.repository, itemSaveDto);
    if (!item) {
      req.flash('errors', `Not found ${this.key} to save!!!`);
      return res.redirect(`/admin/${this.key}`);
    }
    req.flash('infos', `Save ${this.key} success!`);
    return res.redirect(`/admin/${this.key}/${item.id}`);
  }

  /**
   * @Delete('/:id')
   */
  async delete(@Res() res: Response, @Req() req: any, @Param('id') id: number, titleShowDelete='') {
    const item = await this.repository.findOneBy({id: id});
    if (!item) {
      req.flash('errors', `Not found ${this.key} to delete!!!`);
    } else {
      await this.repository.delete(item.id);
      if (!titleShowDelete) {
        titleShowDelete = 'name';
      }
      req.flash('infos', `DELETE ${this.key} ${item[titleShowDelete]}(id: ${item.id}) success!`);
    }
    return res.redirect(`/admin/${this.key}`);
  }
}
