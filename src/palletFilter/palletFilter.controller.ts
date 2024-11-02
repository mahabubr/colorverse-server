import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { Response } from '..//utils/response';
import { PalletFilterService } from './palletFilter.service';

@Controller('pallet-filter')
export class PalletFilterController {
  constructor(private palletFilterService: PalletFilterService) {}

  @Get('options')
  // @UseGuards(AuthGuard)
  async getFilterOptions() {
    try {
      const result = await this.palletFilterService.getPalletFilter();
      return Response.create(
        HttpStatus.OK,
        'Pallet filter options created successful',
        result,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get pallet filter options',
        error.message,
      );
    }
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  async getSinglePallet(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.palletFilterService.getUserPallet(id);
      return Response.create(HttpStatus.OK, 'Pallet get successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get pallet',
        error.message,
      );
    }
  }
}
