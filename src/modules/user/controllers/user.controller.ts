import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(): Promise<any> {
    return this.userService.list();
  }

  @Get('phones')
  async listPhone(): Promise<any> {
    return this.userService.listPhone();
  }

  @Get('user-phones')
  async listUserPhone(): Promise<any> {
    return this.userService.listUserPhone();
  }
}
