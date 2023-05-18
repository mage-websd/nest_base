import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/constants';

export class BannerSaveDto {
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
  @Type(() => Number)
  @IsIn(Object.values(STATUS))
  status: number
}
