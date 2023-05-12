import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_ARR } from 'src/constants';

export class AdminLoggedDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserSaveDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsIn(STATUS_ARR)
  status: number
}
