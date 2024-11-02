import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PalletController } from './pallet.controller';
import { PalletService } from './pallet.service';

@Module({
  imports: [PrismaModule],
  controllers: [PalletController],
  providers: [PalletService],
  exports: [],
})
export class PalletModule {}
