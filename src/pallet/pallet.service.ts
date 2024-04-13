import { Injectable } from '@nestjs/common';
import { Pallet } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PalletService {
  constructor(private prisma: PrismaService) {}

  async createPallet(payload: Pallet) {
    return this.prisma.pallet.create({ data: payload });
  }
}
