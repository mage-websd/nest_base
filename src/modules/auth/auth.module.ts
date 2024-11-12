import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config';
import { AuthGuard } from './guards/auth.guard';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: config.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthMiddleware],
  exports: [AuthService, AuthGuard, AuthMiddleware],
})
export class AuthModule {}
