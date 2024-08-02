import { Logger } from 'typeorm';
import logger from '.';

export class DBLog implements Logger {
  logQuery(query: string, parameters?: any[]) {
    logger.db({
      query,
      parameters: parameters && parameters.length > 0 ? parameters : undefined,
    });
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    logger.dberror({
      error,
      query,
      parameters: parameters && parameters.length > 0 ? parameters : undefined,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    logger.dbslow({
      time,
      query,
      parameters: parameters && parameters.length > 0 ? parameters : undefined,
    });
  }

  logSchemaBuild(message: string) {
    logger.db(message);
  }

  logMigration(message: string) {
    logger.db(message);
  }

  log() {}
}
