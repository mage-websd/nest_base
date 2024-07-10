import { DataSource, DataSourceOptions } from 'typeorm';
import { DBLog } from '../helpers/logs/dblog';
import config from '.';

export const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: config.DATABASE_HOST,
  port: parseInt(config.DATABASE_PORT),
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  synchronize: false,
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../databases/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  logging: config.DATABASE_LOG ? ['query', 'error'] : undefined,
  logger: config.DATABASE_LOG ? new DBLog() : undefined,
  maxQueryExecutionTime: 1000,
  extra: {
    connectionLimit: config.DATABASE_POOLSIZE, // Use your desired connection pool size
  },
};

const DBsource = new DataSource(connectionOptions);
DBsource.initialize()
  .then(() => {
    console.info('DB mysql has been initialized!');
  })
  .catch((err) => {
    console.error('Error during mysql initialization', err);
  });

export default DBsource;
