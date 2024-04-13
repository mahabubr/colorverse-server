import {
  IsString,
  IsArray,
  IsInt,
  Min,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class CreatePaletteDto {
  @IsOptional()
  id: string;

  @ValidateNested()
  @IsObject({ message: 'Primary code is required' })
  primary: object;

  @ValidateNested()
  @IsObject({ message: 'Secondary code is required' })
  secondary: object;

  @ValidateNested()
  @IsObject({ message: 'Accent code is required' })
  accent: object;

  @ValidateNested()
  @IsObject({ message: 'Light code is required' })
  light: object;

  @ValidateNested()
  @IsObject({ message: 'Dark code is required' })
  dark: object;

  @IsArray({ message: 'Tags are required' })
  tags: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  likes: number;

  @IsString()
  userId: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
