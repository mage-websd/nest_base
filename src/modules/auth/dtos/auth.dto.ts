import { IsEmail, IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { UserRepository } from 'src/repositories';
import __ from 'src/helpers/lang';
import { UniqueValidator, XssValidator } from 'src/helpers/validators';

export class LoginPost {
  @IsNotEmpty({
    message: __('required', {
      label: 'mail',
    }),
  })
  @MaxLength(50, {
    message: __('required', {
      label: 'mail',
      max: 50,
    }),
  })
  @Validate(XssValidator)
  @IsEmail(
    { ignore_max_length: true },
    {
      message: __('email', {
        label: 'mail',
      }),
    },
  )
  mail: string;

  @IsNotEmpty({
    message: __('required', {
      label: 'password',
    }),
  })
  @MaxLength(20, {
    message: __('max_string', {
      label: 'password',
      max: 20,
    }),
  })
  password: string;
}

export class RegisterPost {
  @IsNotEmpty({
    message: __('required', {
      label: 'name',
    }),
  })
  @MaxLength(50, {
    message: __('max_string', {
      label: 'name',
      max: 50,
    }),
  })
  name: string;

  @IsNotEmpty({
    message: __('required', {
      label: 'mail',
    }),
  })
  @MaxLength(50, {
    message: __('max_string', {
      label: 'mail',
      max: 50,
    }),
  })
  @Validate(XssValidator)
  @IsEmail(
    { ignore_max_length: true },
    {
      message: __('email', {
        label: 'mail',
      }),
    },
  )
  @Validate(UniqueValidator, [
    {
      repository: UserRepository,
      column: 'mail',
    },
  ])
  mail: string;

  @IsNotEmpty({
    message: __('required', {
      label: 'password',
    }),
  })
  @MaxLength(20, {
    message: __('max_string', {
      label: 'password',
      max: 20,
    }),
  })
  password: string;
}
