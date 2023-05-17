import AppDataSource from "../config/datasource";
import { Timeline } from '../entities';

export const TimelineRepository = AppDataSource.getRepository(Timeline).extend({});
