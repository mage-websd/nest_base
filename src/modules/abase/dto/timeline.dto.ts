import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/constants';

export class TimelineSaveDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn(Object.values(STATUS))
  status: number
}
