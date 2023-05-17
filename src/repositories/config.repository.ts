import AppDataSource from "../config/datasource";
import { Config } from '../entities';

export const ConfigRepository = AppDataSource.getRepository(Config).extend({});
