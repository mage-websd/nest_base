import { Seeder } from '@jorgebodega/typeorm-seeding';
import { UserPhoneRepository, UserRepository } from '../../repositories';

export default class UserSeeder extends Seeder {
  async run(): Promise<any> {
    await this.user();
    await this.userPhone();
  }

  private async user() {
    const user = await UserRepository.find({
      take: 1,
    });

    if (user.length > 0) {
      return true;
    }

    for (let i = 0; i < 10; i++) {
      await UserRepository.save(
        UserRepository.create({
          id: i,
          name: `user ${i}`,
          mail: `user${i}@example.com`,
          password: 'abc123',
          createdUserId: 0,
          updatedUserId: 0,
        }),
      );
    }

    console.log('-- seeder User', new Date());
  }

  private async userPhone() {
    const userPhone = await UserPhoneRepository.find({
      take: 1,
    });

    if (userPhone.length > 0) {
      return true;
    }

    for (let i = 0; i < 20; i++) {
      await UserPhoneRepository.save(
        UserPhoneRepository.create({
          id: i,
          userId: Math.floor(i / 2),
          phone: `123-${i}`,
          createdUserId: 0,
          updatedUserId: 0,
        }),
      );
    }

    console.log('-- seeder UserPhones', new Date());
  }
}
