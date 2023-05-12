import {
  Controller,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/admin/dashboard')
export class DashboardController {
  constructor() {}

  @Get()
  async index(@Res() res: Response) {
    return res.render(
      'dashboard/index',
        {
          title: 'Dashbaord',
          menuActive: JSON.stringify(['dashboard']),
        }
    );
  }
}
