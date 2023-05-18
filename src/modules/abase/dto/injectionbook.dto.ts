import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class InjectionBookSaveDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  vacId: number;

  @IsNotEmpty()
  @IsDateString()
  vacDate: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  note: string;

  @ValidateIf(o => !o.childId || o.number)
  @IsNotEmpty()
  userId: number;

  @ValidateIf(o => !o.userId || o.childId)
  @IsNotEmpty()
  childId: number;
}
