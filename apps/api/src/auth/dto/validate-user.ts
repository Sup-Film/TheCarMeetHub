import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  userId: string;
}
