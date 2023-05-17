import AppDataSource from "../config/datasource";
import { Child } from '../entities';

export const ChildRepository = AppDataSource.getRepository(Child).extend({});
