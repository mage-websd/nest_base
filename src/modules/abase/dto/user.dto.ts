import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { STATUS, GENDER } from 'src/constants';

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