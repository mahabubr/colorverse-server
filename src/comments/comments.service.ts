import { Injectable } from '@nestjs/common';
import { Comments } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComments(payload: Comments) {
    return this.prisma.comments.create({ data: payload });
  }

  async getAllComments(id: string) {
    return this.prisma.comments.findMany({
      where: { pallet: { id } },
      include: {
        user: true,
        pallet: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getRecentComments() {
    return this.prisma.comments.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: true,
        pallet: true,
      },
    });
  }
}
