import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoggedDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
