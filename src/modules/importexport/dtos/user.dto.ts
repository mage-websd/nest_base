import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { UserRepository } from 'src/repositories';
import __ from 'src/helpers/lang';
import { InIdValidator } from 'src/helpers/validators';

export class UserPhoneDTO {
  @IsNotEmpty({
    message: __('required', {
      label: 'userId',
    }),
  })
  @IsInt({
    message: __('int', {
      label: 'userId',
    }),
  })
  @Validate(InIdValidator, [
    {
      repository: UserRepository,
      label: 'userId',
    },
  ])
  userId: number;

  @IsNotEmpty({
    message: __('required', {
      label: 'phone',
    }),
  })
  @IsString({
    message: __('string', {
      label: 'phone',
    }),
  })
  @MaxLength(20, {
    message: __('max_string', {
      label: 'phone',
      max: 20,
    }),
  })
  phone: string;
}
