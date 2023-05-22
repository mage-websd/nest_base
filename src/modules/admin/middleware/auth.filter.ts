import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
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
    response.status(status).redirect('/admin/dashboard');
  }
}

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const req = ctx.getRequest();
    const resError: any = exception.getResponse();
    if (resError && resError.message && resError.message.length > 0) {
      req.flash('errors', resError.message);
    }    
    response.status(status).redirect('back');
  }
}