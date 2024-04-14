import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PalletFilterService {
  constructor(private prisma: PrismaService) {}

  async getPalletFilter() {
    const tags = await this.prisma.pallet.findMany({
      select: {
        tags: true,
      },
    });

    const margeTags = tags.reduce((acc, cur) => {
      return acc.concat(cur.tags);
    }, []);

    const uniqueTagsSets = new Set(margeTags);

    const uniqueTags = Array.from(uniqueTagsSets);

    return uniqueTags;
  }
}
