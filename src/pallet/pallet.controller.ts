import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreatePaletteDto } from './dto/createPalletDto';
import { PalletService } from './pallet.service';
import { Response } from 'src/utils/response';

@Controller('pallet')
export class PalletController {
  constructor(private palletService: PalletService) {}

  @Post('create')
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
}
