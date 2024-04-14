import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { Response } from 'src/utils/response';
import { PalletFilterService } from './palletFilter.service';

@Controller('pallet-filter')
export class PalletFilterController {
  constructor(private palletFilterService: PalletFilterService) {}

  @Get('options')
  @UseGuards(AuthGuard)
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
}
