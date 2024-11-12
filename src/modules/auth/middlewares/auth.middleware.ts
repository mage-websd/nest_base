import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(request: any, _res: Response, next: NextFunction) {
    request.user = await this.authService.authenticated(request);

    next();
  }
}
