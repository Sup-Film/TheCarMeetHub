import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  tel: string;
}
