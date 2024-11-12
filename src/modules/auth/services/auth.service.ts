import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { LoginPost, RegisterPost } from '../dtos/auth.dto';
import { UserRepository } from 'src/repositories';
import __ from 'src/helpers/lang';

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {}

  public async login(body: LoginPost) {
    const user = await UserRepository.findOneBy({ mail: body.mail });

    if (!user || !(await compare(body.password, user.password))) {
      throw new NotFoundException();
    }

    const payload = {
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async register(body: RegisterPost) {
    const user = await UserRepository.findOneBy({ mail: body.mail });

    if (user) {
      throw new BadRequestException(__('unique', { field: 'mail' }));
    }

    const salt = await genSalt();
    const hashedPassword = await hash(body.password, salt);

    await UserRepository.save(
      UserRepository.create({
        mail: body.mail,
        password: hashedPassword,
        name: body.name,
        createdUserId: 0,
        updatedUserId: 0,
      }),
    );
  }

  public async authenticated(request: Request) {
    try {
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = this.jwtService.verify(token);

      if (!payload || !payload.sub) {
        throw new UnauthorizedException();
      }

      const user = await UserRepository.findOneBy({ id: payload.sub });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
