import { IsString, IsOptional } from 'class-validator';

export class CreateCollectionDto {
  @IsOptional()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  palletId: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
