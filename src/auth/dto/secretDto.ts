import { IsString } from 'class-validator';

export class SecretDto {
  @IsString({ message: 'Token is Required' })
  token: string;
}
