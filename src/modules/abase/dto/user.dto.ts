import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Validate, ValidateIf } from 'class-validator';
import { STATUS, GENDER } from 'src/constants';
import { User } from 'src/entities';
import { UserRepository } from 'src/repositories';
import { IsUnique } from 'src/utils/validation/unique';

export class UserSaveDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn(Object.values(STATUS))
  status: number

  @IsOptional()
  @Type(() => Number)
  @IsIn(Object.values(GENDER))
  gender: number

  @IsOptional()
  @ValidateIf(o => o.birth != '')
  @IsDateString()
  birth: Date

  @IsOptional()
  @ValidateIf(o => o.username != '')
  @IsUnique(UserRepository)
  username: string

  @IsOptional()
  password: string
}

export class ConfigSaveDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

