import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Collection } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async createCollection(payload: Collection) {
    const isCollectionExist = await this.prisma.collection.findFirst({
      where: {
        pallet: { id: payload.palletId },
        user: { id: payload.userId },
      },
    });

    const isUserCollection = await this.prisma.collection.findMany({
      where: { user: { id: payload.userId } },
    });

    if (isUserCollection.length >= 12) {
      throw new NotAcceptableException('Collection got his maximum climbs');
    }

    if (isCollectionExist) {
      throw new Error('Pallet already exist');
    }

    return this.prisma.collection.create({ data: payload });
  }

  async getCollection(id: string) {
    return this.prisma.collection.findMany({
      where: { user: { id } },
      include: {
        pallet: true,
        user: true,
      },
    });
  }

  async deleteCollection(id: string) {
    return this.prisma.collection.delete({ where: { id } });
  }
}
