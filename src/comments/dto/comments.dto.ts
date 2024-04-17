import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  id: string;

  @IsString({ message: 'Comment is required' })
  comment: string;

  @IsString({ message: 'User Id is required' })
  userId: string;

  @IsString({ message: 'Pallet Id is required' })
  palletId: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;
}
