import { IsEmail, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class AppBaseDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn([1,2,3])
  status: string;

  @IsOptional()
  address: string;
}
