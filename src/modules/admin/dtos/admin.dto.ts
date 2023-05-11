import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AdminLoggedDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
