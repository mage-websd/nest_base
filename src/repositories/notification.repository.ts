import AppDataSource from "../config/datasource";
import { Notification } from '../entities';

export const NoticationRepository = AppDataSource.getRepository(Notification).extend({});
