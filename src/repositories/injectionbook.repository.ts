import AppDataSource from "../config/datasource";
import { InjectionBook } from '../entities';

export const InjectionBookRepository = AppDataSource.getRepository(InjectionBook).extend({});
