import AppDataSource from "../config/datasource";
import { User } from '../entities';

export const UserRepository = AppDataSource.getRepository(User).extend({});
