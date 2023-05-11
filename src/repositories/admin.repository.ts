import AppDataSource from "../config/datasource";
import { Admin } from '../entities';

export const AdminRepository = AppDataSource.getRepository(Admin).extend({});
