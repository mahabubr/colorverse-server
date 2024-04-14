import { Injectable } from '@nestjs/common';
import { Collection } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async createCollection(payload: Collection) {
    const isCollectionExist = await this.prisma.collection.findFirst({
      where: { pallet: { id: payload.palletId } },
    });

    if (isCollectionExist) {
      throw new Error('Pallet already exist');
    }

    return this.prisma.collection.create({ data: payload });
  }

  async getCollection() {
    return this.prisma.collection.findMany({
      include: {
        pallet: true,
        user: true,
      },
    });
  }
}
