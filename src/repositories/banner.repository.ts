import AppDataSource from "../config/datasource";
import { Banner } from '../entities';

export const BannerRepository = AppDataSource.getRepository(Banner).extend({});
