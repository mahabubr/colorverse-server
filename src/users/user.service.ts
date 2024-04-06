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
}
