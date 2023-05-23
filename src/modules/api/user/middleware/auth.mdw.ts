import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { STATUS } from "src/constants";
import { User } from "src/entities";
import { UserRepository } from "src/repositories";

@Injectable()
export class AuthApiMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const author = Number(req.header('api'));
        if (!author) {
          throw new UnauthorizedException('Authentication token not found');
        }
        const user = await UserRepository.findOneBy({
            id: author,
        });
        if (!user) {
          throw new UnauthorizedException('Authentication token not found');
        }
        if (user.status !== STATUS.enable) {
          throw new UnauthorizedException('User not active');
        }
        res.locals.user = user;
        next();
    }
}
