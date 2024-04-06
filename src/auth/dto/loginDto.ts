import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Password is Required' })
  password: string;

  @IsString({ message: 'Email is Required' })
  @IsEmail()
  email: string;
}
