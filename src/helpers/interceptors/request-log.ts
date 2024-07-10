import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from '../logs';
import { diffTime } from '../utils';

@Injectable()
export class RequestLog implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime.bigint();
    response.on('close', () => {
      const logObj: any = {
        log_level: 'info',
        log_type: 'app',
        time: diffTime(startAt),
        request: {
          clientIp: request.ip,
          url: request.url,
          method: request.method,
          parameters: request.body,
        },
        response: {
          http_status: response.statusCode,
        },
      };

      if ((request as any).user) {
        logObj.user_id = (request as any).user.id;
      }

      logger.info(logObj);
    });

    next();
  }
}
