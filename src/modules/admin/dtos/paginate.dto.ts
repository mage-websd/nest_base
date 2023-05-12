import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number;
}
