import DBsource from '../config/db';
import { UserPhone } from '../entities';

export const UserPhoneRepository = DBsource.getRepository(UserPhone).extend({});
