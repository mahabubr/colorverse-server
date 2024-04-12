import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashPassword } from 'src/utils/hashPassword';
import { JwtHandler } from 'src/utils/jwtHandler';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashPassword: HashPassword,
  ) {}

  async login(payload: Partial<User>) {
    const isUserExist = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }

    const compare = await this.hashPassword.compare(
      payload.password,
      isUserExist.password,
    );

    if (!compare) {
      throw new ForbiddenException('Password not matched');
    }

    const { id, email, username, role } = isUserExist;

    const accessToken = JwtHandler.sign(
      { id, email, username, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return accessToken;
  }

  async refreshToken(secret: { token: string }) {
    let verify;

    try {
      verify = JwtHandler.verify(secret.token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ForbiddenException('Token not found');
    }

    const isUserExist = await this.prisma.user.findFirst({
      where: { email: verify.email },
    });

    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }

    const { id, email, username, role } = isUserExist;

    const refresh = JwtHandler.sign(
      { id, email, username, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
    );

    return refresh;
  }

  async me(token: string) {
    const decode: any = await JwtHandler.decode(token);
    const { email } = decode;

    return this.prisma.user.findFirst({ where: { email } });
  }
}
