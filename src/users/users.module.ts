import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './users.controller';
import { HashPassword } from './utls/hashPassword';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, HashPassword],
})
export class UserModule {}
