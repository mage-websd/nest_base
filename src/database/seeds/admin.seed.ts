import { AdminRepository } from 'src/repositories';
import { AuthService } from 'src/modules/admin/services';

const USER = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
  },
];

export class AdminSeed {
  async run() {
    for (const i in USER) {
      await this.insertUserItem(USER[i]);
    }
    console.log('Seed admin success');
  }

  async insertUserItem(item: any) {
    const adminItem = await AdminRepository.findOne({
      where: {
          id: item.id,
      },
    });
    if (adminItem) {
      return;
    }
    const authService = new AuthService();
    item.password = await authService.hashPassword(item.password);
    const newItem = AdminRepository.create(item);
    console.log('seed admin item', newItem);
    await AdminRepository.save(newItem);
  }
};
