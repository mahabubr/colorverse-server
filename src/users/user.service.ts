import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import generateUsername from './utls/generateUsername';
import { HashPassword } from '../utils/hashPassword';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hashPassword: HashPassword,
  ) {}

  async createUser(payload: User) {
    const isExistUser = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (isExistUser) {
      throw new NotAcceptableException('User already Exist');
    }

    const username = generateUsername();
    const hash = await this.hashPassword.hash(
      payload.password,
      Number(process.env.SALT_ROUND),
    );

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
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        contribute: true,
      },
    });

    const total = await this.prisma.user.count({
      where: whereCondition,
    });

    return { data, total };
  }

  async getSingleUser(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        username: true,
        contribute: true,
      },
    });
  }

  async updateUser(id: string, payload: Partial<User>) {
    return this.prisma.user.update({ where: { id }, data: payload });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getTopContributor() {
    return this.prisma.user.findMany({
      orderBy: {
        contribute: 'desc',
      },
      take: 10,
    });
  }

  async getRecentUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }
}
