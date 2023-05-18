import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/constants';

export class VacxinSaveDto {
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
}
