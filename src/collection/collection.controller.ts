import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Response } from 'src/utils/response';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateCollectionDto } from './dto/collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createCollection(@Body() createCollectionDto: CreateCollectionDto) {
    try {
      const result =
        await this.collectionService.createCollection(createCollectionDto);
      return Response.create(
        HttpStatus.OK,
        'Collection Create Successful',
        result,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create collection',
        error.message,
      );
    }
  }

  @Get('')
  @UseGuards(AuthGuard)
  async getCollection() {
    try {
      const result = await this.collectionService.getCollection();
      return Response.create(
        HttpStatus.OK,
        'Collection get Successful',
        result,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get collection',
        error.message,
      );
    }
  }
}
