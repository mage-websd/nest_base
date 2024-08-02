/* USE
 * import logger from "./helpers/logs"
 *
 * logger.info('log message');
 * logger.error('log message');
 * logger.dberror('exception db');
 */
import * as log4js from 'log4js';
import { resolve } from 'path';
import * as moment from 'moment';

/**
 *
 * Returns Logger
 * @param {*} moduleName
 * @returns
 */
const isPm2 = process.env.PM2_PROGRAMMATIC === 'true';
const folder = resolve(
  isPm2 ? process.env.pm_cwd : process.env.PWD ?? '',
  'logs',
);

const appLog = resolve(folder, 'app.log');
const errorLog = resolve(folder, 'error.log');
const dbLog = resolve(folder, 'db.log');
const dbLogSlow = resolve(folder, 'db-slow.log');
const dbLogError = resolve(folder, 'db-error.log');

log4js.addLayout('json', function () {
  return function (logEvent) {
    if (Array.isArray(logEvent.data)) {
      logEvent.data = logEvent.data[0];
    }

    return JSON.stringify({
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      ...logEvent.data,
    });
  };
});

const logItemConfig = {
  type: 'dateFile',
  keepFileExt: false,
  maxLogSize: 50 * 1024 * 1024,
  numBackups: 30,
  filename: 'log',
  alwaysIncludePattern: true,
  mode: 0o666,
  layout: {
    type: 'json',
  },
};

const logConfig = {
  appenders: {
    app: {
      ...logItemConfig,
      filename: appLog,
    },
    error: {
      ...logItemConfig,
      filename: errorLog,
    },
    db: {
      ...logItemConfig,
      filename: dbLog,
    },
    dbslow: {
      ...logItemConfig,
      filename: dbLogSlow,
    },
    dberror: {
      ...logItemConfig,
      filename: dbLogError,
    },
  },
  categories: {
    default: { appenders: ['app'], level: 'debug' },
    error: { appenders: ['error'], level: 'debug' },
    db: { appenders: ['db'], level: 'debug' },
    dbslow: { appenders: ['dbslow'], level: 'debug' },
    dberror: { appenders: ['dberror'], level: 'debug' },
  },
  pm2: isPm2,
};

log4js.configure(logConfig);

const logger = {
  core: log4js,
  info: function (message: any) {
    log4js.getLogger('app').info(message);
  },
  error: function (message: any, ...args: any[]) {
    console.error(message);
    log4js.getLogger('error').error({
      log_level: 'error',
      log_type: 'error',
      stacktrace: message,
      args: args && args.length > 0 ? args : undefined,
    });
  },
  db: function (message: any, ...args: any[]) {
    log4js.getLogger('db').info({
      log_level: 'info',
      log_type: 'db',
      statement: message,
      args: args && args.length > 0 ? args : undefined,
    });
  },
  dbslow: function (message: any, ...args: any[]) {
    log4js.getLogger('dbslow').info({
      log_level: 'info',
      log_type: 'dbslow',
      statement: message,
      args: args && args.length > 0 ? args : undefined,
    });
  },
  dberror: function (message: any, ...args: any[]) {
    log4js.getLogger('dberror').error({
      log_level: 'error',
      log_type: 'dberror',
      statement: message,
      args: args && args.length > 0 ? args : undefined,
    });
  },
};

export default logger;
