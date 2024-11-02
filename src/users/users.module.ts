import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './users.controller';
import { HashPassword } from '../utils/hashPassword';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, HashPassword],
  exports: [],
})
export class UserModule {}
