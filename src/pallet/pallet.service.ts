import { Injectable } from '@nestjs/common';
import { Pallet } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PalletService {
  constructor(private prisma: PrismaService) {}

  async createPallet(payload: Pallet) {
    await this.prisma.user.update({
      where: { id: payload.userId },
      data: {
        contribute: {
          increment: 1,
        },
      },
    });

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
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prisma.pallet.count({
      where: whereCondition,
    });

    return { data, total };
  }

  async getSinglePallet(id: string) {
    return this.prisma.pallet.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async deletePallet(id: string) {
    await this.prisma.comments.deleteMany({
      where: {
        pallet: {
          id,
        },
      },
    });

    await this.prisma.collection.deleteMany({
      where: {
        pallet: {
          id,
        },
      },
    });

    const res = await this.prisma.pallet.findFirst({ where: { id } });
    await this.prisma.user.update({
      where: { id: res.userId },
      data: {
        contribute: {
          decrement: 1,
        },
      },
    });

    return this.prisma.pallet.delete({ where: { id } });
  }
}
