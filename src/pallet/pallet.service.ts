import { Injectable } from '@nestjs/common';
import { Pallet } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PalletService {
  constructor(private prisma: PrismaService) {}

  async createPallet(payload: Pallet) {
    return this.prisma.pallet.create({ data: payload });
  }

  async getPallet(page: number = 1, limit: number = 10, search: string) {
    const skip = (page - 1) * limit;
    const take = limit;

    let whereCondition = {};

    if (search) {
      whereCondition = {
        tags: {
          hasSome: [search],
        },
      };
    }

    const data = await this.prisma.pallet.findMany({
      where: whereCondition,
      skip: Number(skip),
      take: Number(take),
    });

    const total = await this.prisma.pallet.count({
      where: whereCondition,
    });

    return { data, total };
  }
}
