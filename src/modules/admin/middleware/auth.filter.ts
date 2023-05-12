import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
    
@Catch(UnauthorizedException, ForbiddenException)
export class NoAuthFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const req = ctx.getRequest();
    if (response.req.url === '/admin/login') {
      req.flash('errors', 'invalid username or password');
    }
    response.status(status).redirect('/admin/login');
  }
}

@Catch(UnauthorizedException, ForbiddenException)
export class AuthFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const req = ctx.getRequest();
    response.status(status).redirect('/admin/dashboard');
  }
}
