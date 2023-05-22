import {
  Injectable
} from '@nestjs/common';
import { AdminRepository } from 'src/repositories';
import { comparePassword } from 'src/utils';

@Injectable()
export class AuthService {

  async validateAdmin(username: string, password: string): Promise<any> {
    const user = await AdminRepository.findOneBy({
      username: username
    });
    if (!user) {
      return null;
    }
    const passwordValid = await comparePassword(password, user.password)
    
    if (passwordValid) {
      return {
        id: user.id,
        userename: user.username
      };
    }
    return null;
  }
}
