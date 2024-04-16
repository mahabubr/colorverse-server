import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePaletteDto } from './dto/createPalletDto';
import { PalletService } from './pallet.service';
import { Response } from 'src/utils/response';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('pallet')
export class PalletController {
  constructor(private palletService: PalletService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createPallet(@Body() createPalletDto: CreatePaletteDto) {
    try {
      const result = await this.palletService.createPallet(createPalletDto);
      return Response.create(HttpStatus.OK, 'Pallet Create Successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create pallet',
        error.message,
      );
    }
  }

  @Get()
  // @UseGuards(AuthGuard)
  async getPallet(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    try {
      const result = await this.palletService.getPallet(page, limit, search);
      return Response.create(
        HttpStatus.OK,
        'Pallet get successful',
        result.data,
        result.total,
        page,
        limit,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get pallet',
        error.message,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getSinglePallet(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.palletService.getSinglePallet(id);
      return Response.create(HttpStatus.OK, 'Pallet get successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get pallet',
        error.message,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePallet(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.palletService.deletePallet(id);
      return Response.create(HttpStatus.OK, 'Pallet delete Successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete Pallet',
        error.message,
      );
    }
  }
}
