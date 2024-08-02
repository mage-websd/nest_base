import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
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
