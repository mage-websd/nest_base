import { DataSource, DataSourceOptions } from 'typeorm';
import config from './index';

const dbConfig: DataSourceOptions = {
  type: 'mysql',
  host: config.DATABASE_HOST,
  port: Number(config.DATABASE_PORT),
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false,
  extra: {
    connectionLimit: 500,
  },
  migrationsRun: false,
  migrations: [__dirname + '/../database/migrations/*.{ts,js}'],
  logger: 'file',
  logging: config.DATABASE_LOGGING === 'true' ? true : false,
  ...(config.DATABASE_SSL && {
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
})
};

const DBsource = new DataSource(dbConfig);

DBsource.initialize()
  .then(() => {
    console.info('DB mysql has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Postgres initialization', err);
  });

export default DBsource;
export { dbConfig };
