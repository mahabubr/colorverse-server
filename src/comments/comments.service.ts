import { Injectable } from '@nestjs/common';
import { Comments } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComments(payload: Comments) {
    return this.prisma.comments.create({ data: payload });
  }

  async getAllComments(id: string) {
    return this.prisma.comments.findMany({ where: { pallet: { id } } });
  }

  async getRecentComments() {
    return this.prisma.comments.findMany({
      orderBy: { createdAt: 'asc' },
      take: 10,
    });
  }
}
