import {
  Controller,
  HttpStatus,
  Get
} from '@nestjs/common';
import config from 'src/config';
import { ChildRepository, UserRepository } from 'src/repositories';

@Controller('/api/auth')
export class AuthController {

  @Get('register')
  async index() {
    const a = await UserRepository.find({
      where: {
        id: 1
      },
      relations: {
        childs: true
      }
    });
    // const ca = a.childs;

    // const c = await ChildRepository.find({
    //   where: {
    //     id: 1
    //   },
    //   relations: {
    //     user: true
    //   }
    // })
    console.log(a);
    return {
      status: HttpStatus.OK,
      message: 'done',
      env: config.APP_ENV
    }
  }
}
