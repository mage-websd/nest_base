import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      res.redirect('/admin/login');
      return;
    }
    next();
  }
}
