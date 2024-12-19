import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  APP_HOST: process.env.APP_HOST,
  APP_ENV: process.env.APP_ENV,
  APP_PORT: Number(process.env.APP_PORT || 5000),
  APP_LANG: process.env.APP_LANG || 'en',

  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_LOG: process.env.DATABASE_LOG === 'true',
  DATABASE_POOLSIZE: process.env.DATABASE_POOLSIZE,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: Number(process.env.JWT_EXPIRE),

  RABBITMQ_URL: process.env.RABBITMQ_URL,

  //// extends:
  isEnvProduction: process.env.APP_ENV ? process.env.APP_ENV === 'prod' : true,
};

export default config;
