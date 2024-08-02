import { IsEmail, IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { UniqueValidator } from 'src/helpers/validators/unique.validator';
import { XssValidator } from 'src/helpers/validators/xss.validator';
import { UserRepository } from 'src/repositories';
import __ from 'src/helpers/lang';

export class LoginPost {
  @IsNotEmpty({
    message: __('required', {
      field: 'mail',
    }),
  })
  @MaxLength(50, {
    message: __('required', {
      field: 'mail',
      max: 50,
    }),
  })
  @Validate(XssValidator)
  @IsEmail(
    { ignore_max_length: true },
    {
      message: __('email', {
        field: 'mail',
      }),
    },
  )
  mail: string;

  @IsNotEmpty({
    message: __('required', {
      field: 'password',
    }),
  })
  @MaxLength(20, {
    message: __('max_string', {
      field: 'password',
      max: 20,
    }),
  })
  password: string;
}

export class RegisterPost {
  @IsNotEmpty({
    message: __('required', {
      field: 'name',
    }),
  })
  @MaxLength(50, {
    message: __('max_string', {
      field: 'name',
      max: 50,
    }),
  })
  name: string;

  @IsNotEmpty({
    message: __('required', {
      field: 'mail',
    }),
  })
  @MaxLength(50, {
    message: __('max_string', {
      field: 'mail',
      max: 50,
    }),
  })
  @Validate(XssValidator)
  @IsEmail(
    { ignore_max_length: true },
    {
      message: __('email', {
        field: 'mail',
      }),
    },
  )
  @Validate(UniqueValidator, [
    {
      repository: UserRepository,
      column: 'mail',
      field: 'mail',
    },
  ])
  mail: string;

  @IsNotEmpty({
    message: __('required', {
      field: 'password',
    }),
  })
  @MaxLength(20, {
    message: __('max_string', {
      field: 'password',
      max: 20,
    }),
  })
  password: string;
}
