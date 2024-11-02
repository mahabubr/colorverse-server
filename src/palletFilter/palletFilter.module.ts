import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PalletFilterController } from './palletFilter.controller';
import { PalletFilterService } from './palletFilter.service';

@Module({
  imports: [PrismaModule],
  controllers: [PalletFilterController],
  providers: [PalletFilterService],
  exports: [],
})
export class PalletFilterModule {}
