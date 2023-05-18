import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { STATUS } from 'src/constants';

export class NotificationSaveDto {
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
  @IsString()
  image: string;
  
  @IsOptional()
  @IsString()
  device: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn(Object.values(STATUS))
  status: number

  @IsOptional()
  @ValidateIf(o => o.date != '')
  @IsDateString()
  date: Date
}
