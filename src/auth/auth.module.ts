import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashPassword } from '../utils/hashPassword';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, HashPassword],
  exports: [],
})
export class AuthModule {}
