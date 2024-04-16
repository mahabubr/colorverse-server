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
  @IsString({ message: 'Contribute is Required' })
  contribute: number;

  @IsOptional()
  @IsString({ message: 'Bio is Required' })
  bio: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
