import {
  Injectable, NotAcceptableException
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { AdminRepository } from 'src/repositories';

@Injectable()
export class AuthService {

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  async comparePassword(password: string, storePasswordHash: string): Promise<boolean> {
    return await compare(password, storePasswordHash);
  }

  async validateAdmin(username: string, password: string): Promise<any> {
    const user = await AdminRepository.findOneBy({
      username: username
    });
    if (!user) {
      throw new NotAcceptableException('could not find the admin');
    }
    const passwordValid = await this.comparePassword(password, user.password)
    
    if (passwordValid) {
      return {
        id: user.id,
        userename: user.username
      };
    }
    return null;
  }
}
