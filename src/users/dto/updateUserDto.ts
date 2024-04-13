import { IsString, IsEmail, IsIn, IsDate, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString({ message: 'Username is Required' })
  username: string;

  @IsOptional()
  @IsString({ message: 'Full Name is Required' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Password is Required' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Email is Required' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsIn(['creator', 'admin'], { message: 'Role is Required' })
  role: 'creator' | 'admin';

  @IsOptional()
  @IsString({ message: 'Contribute is Required' })
  contribute: number;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
