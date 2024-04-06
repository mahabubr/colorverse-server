import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import generateUsername from './utls/generateUsername';
import { HashPassword } from './utls/hashPassword';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hashPassword: HashPassword,
  ) {}

  async createUser(payload: User) {
    const username = generateUsername();
    const hash = await this.hashPassword.hash(payload.password, 12);

    const data = {
      username,
      name: payload.name,
      password: hash,
      email: payload.email,
      role: payload.role,
    };

    return this.prisma.user.create({ data });
  }

  async getUsers(page: number = 1, limit: number = 10, search: string) {
    const skip = (page - 1) * limit;
    const take = limit;

    let whereCondition = {};
    if (search) {
      whereCondition = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const data = await this.prisma.user.findMany({
      where: whereCondition,
      skip: Number(skip),
      take: Number(take),
    });

    const total = await this.prisma.user.count({ where: whereCondition });

    return { data, total };
  }

  async getSingleUser(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
}
