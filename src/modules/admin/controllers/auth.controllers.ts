import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Res,
  Get,
  UseGuards,
  Req,
  Render,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services';
import { AdminLoggedDto } from '../dtos';
import { LocalAuthGuard, AuthenticatedGuard } from '../guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { renderHtml } from '../utils';

@Controller('/admin')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async index() {
    return {
      status: HttpStatus.OK,
      message: 'done',
    }
  }

  @Get('login')
  async login(@Res() res: Response) {
    return res.render(
      'auth/login',
        {
          title: 'Login',
          layout: 'layout/login',
          jsFooter: await renderHtml(res, 'auth/login-js')
        }
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Res() res: Response, @Req() req: any, @Body() body: AdminLoggedDto) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "done"
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Req() req: any): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Req() req: any) {
    req.session.destroy();
    return { msg: 'The user session has ended' }
  }
}
