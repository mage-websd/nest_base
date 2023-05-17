import AppDataSource from "../config/datasource";
import { Vacxin } from '../entities';

export const VacxinRepository = AppDataSource.getRepository(Vacxin).extend({});
