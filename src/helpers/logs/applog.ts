import { ConsoleLogger } from '@nestjs/common';
import logger from '.';

export class AppLog extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    logger.error(stack);
  }
}
