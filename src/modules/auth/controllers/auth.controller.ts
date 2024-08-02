import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginPost, RegisterPost } from '../dtos/auth.dto';
import { responseSuccess } from 'src/helpers/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginPost): Promise<any> {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterPost): Promise<any> {
    await this.authService.register(body);

    return responseSuccess();
  }
}
