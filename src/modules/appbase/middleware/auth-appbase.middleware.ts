import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthApppBaseMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const auth = req.header('auth');
        if (!auth) {
          throw new UnauthorizedException('Auth not');
        }
        res.locals.auth = {auth: 'user auth'};
        next();
    }
}
