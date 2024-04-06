import { IsString, IsEmail, IsIn, IsDate, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString({ message: 'Username is Required' })
  username: string;

  @IsString({ message: 'Full Name is Required' })
  name: string;

  @IsString({ message: 'Password is Required' })
  password: string;

  @IsString({ message: 'Email is Required' })
  @IsEmail()
  email: string;

  @IsIn(['creator', 'admin'], { message: 'Role is Required' })
  role: 'creator' | 'admin';

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
