import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Response } from '../utils/response';
import { AuthGuard } from '../guard/auth.guard';
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

  @Get(':id')
  @UseGuards(AuthGuard)
  async getCollection(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.collectionService.getCollection(id);
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteCollection(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.collectionService.deleteCollection(id);
      return Response.create(
        HttpStatus.OK,
        'Collection delete Successful',
        result,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete collection',
        error.message,
      );
    }
  }
}
