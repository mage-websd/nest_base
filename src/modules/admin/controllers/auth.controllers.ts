import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Res,
  Get,
  UseGuards,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { AdminLoggedDto } from '../dtos';
import { LocalAuthGuard, NoAuthenticatedGuard } from '../guards';
import { renderHtml } from '../utils';
import { AuthFilter, NoAuthFilter } from '../middleware';

@Controller('/admin')
export class AuthController {
  constructor() {}

  @Get()
  async index(@Res() res: Response) {
    return res.status(HttpStatus.OK).redirect('/admin/login');
  }

  @Get('login')
  @UseGuards(NoAuthenticatedGuard)
  @UseFilters(AuthFilter)
  async login(@Res() res: Response, @Req() req: any) {
    const errors = req.flash('errors');
    return res.render(
      'auth/login',
        {
          title: 'Login',
          layout: 'layout/login',
          jsFooter: await renderHtml(res, 'auth/login-js'),
          errors: errors
        }
    );
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseFilters(NoAuthFilter)
  async postLogin(@Res() res: Response, @Req() req: any, @Body() body: AdminLoggedDto) {
    return res.status(HttpStatus.OK).redirect('/admin/dashboard');
  }

  @Get('/logout')
  logout(@Res() res: Response, @Req() req: any) {
    req.session.destroy();
    return res.redirect('/admin/login');
  }
}
