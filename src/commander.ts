/**
 * init env run cmd
 */
process.env.RUN_ONLY_CMD='1';

import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { LogService } from './utils/logs/log.service';

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    logger: new LogService()
  });
}

bootstrap()
  .then(async (app) => {
    console.info('command bootstrapped ...!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(`server failed to start command`, err);
    process.exit(1);
  })
  .finally(() => {
    return true;
  });
