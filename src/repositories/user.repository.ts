import DBsource from '../config/db';
import { User } from '../entities';

export const UserRepository = DBsource.getRepository(User).extend({});
