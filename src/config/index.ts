import { config as dotenvLib } from 'dotenv';
import * as fs from 'fs';
const baseDir = __dirname + '/../../';

/**
 * find .env file: .env.prod, not eixsts -> .env
 */
const getPathEnv = () => {
  if (fs.existsSync(`.env.${process.env.NODE_ENV}`)) {
    return `.env.${process.env.NODE_ENV}`;
  }
  if (fs.existsSync(baseDir + `.env.${process.env.NODE_ENV}`)) {
    return baseDir + `.env.${process.env.NODE_ENV}`;
  }
  if (fs.existsSync('.env')) {
    return '.env';
  }
  if (fs.existsSync(baseDir + '.env')) {
    return baseDir + '.env';
  }
  return null;
};
const configDotenv: any = {
  path: getPathEnv(),
};
dotenvLib(configDotenv);
if (configDotenv.path) {
  console.info('+_+ =_= ----- Load file env', configDotenv.path);
}
const appEnv = process.env.APP_ENV?.toLowerCase();

const configDefault = {
  basedir: baseDir,
  isProd: ['prod', 'production'].includes(appEnv) ? true : false,
  RUN_ONLY_CMD: process.env.RUN_ONLY_CMD === '1',
};

const config = Object.assign(configDefault, process.env);

const redisOption: any = {};
redisOption.host = config.REDIS_HOST;
redisOption.port = Number(config.REDIS_PORT);
if (config.REDIS_USERNAME) {
  redisOption.username = config.REDIS_USERNAME;
}
if (config.REDIS_PASSWORD) {
  redisOption.password = encodeURIComponent(config.REDIS_PASSWORD);
}
if (config.REDIS_DB) {
  redisOption.db = Number(config.REDIS_DB);
} else {
  redisOption.db = 0;
}
redisOption.url = `redis://${redisOption.username ?? ''}:${
  redisOption.password ?? ''
}@${redisOption.host}:${redisOption.port}/${redisOption.db}`;

export default config;
export { redisOption };
