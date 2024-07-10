import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { UserPhoneRepository, UserRepository } from 'src/repositories';

@Injectable()
export class UserService {
  public async list(): Promise<Array<User>> {
    return UserRepository.find({
      select: ['id', 'name', 'mail'],
      take: 10,
    });
  }

  public async listPhone(): Promise<any> {
    return UserPhoneRepository.createQueryBuilder('p')
      .select(['p.id as id', 'p.userId as userId', 'p.phone as phone'])
      .limit(10)
      .getRawMany();
  }

  public async listUserPhone(): Promise<any> {
    return UserPhoneRepository.createQueryBuilder('p')
      .select([
        'u.id as userId',
        'u.name as userName',
        'p.id as phoneId',
        'p.phone as phone',
      ])
      .innerJoin('p.user', 'u')
      .limit(10)
      .getRawMany();
  }
}
