import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  APP_HOST: process.env.APP_HOST,
  APP_ENV: process.env.APP_ENV,
  APP_PORT: Number(process.env.APP_PORT || 5000),

  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_LOG: process.env.DATABASE_LOG === 'true',
  DATABASE_POOLSIZE: process.env.DATABASE_POOLSIZE,

  //// extends:
  isEnvProduction: process.env.APP_ENV ? process.env.APP_ENV === 'prod' : true,
};

export default config;
