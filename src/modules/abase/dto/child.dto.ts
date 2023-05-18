import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { GENDER, STATUS } from 'src/constants';

export class ChildSaveDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nick: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn(Object.values(GENDER))
  gender: number
  
  @IsOptional()
  @ValidateIf(o => o.birth != '')
  @IsDateString()
  birth: Date

  @IsOptional()
  @ValidateIf(o => o.duebirth != '')
  @IsDateString()
  duebirth: Date

  @IsOptional()
  @IsString()
  placebirth: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn(Object.values(STATUS))
  status: number
}
