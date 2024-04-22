import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PalletModule } from './pallet/pallet.module';
import { PalletFilterModule } from './palletFilter/palletFilter.module';
import { CollectionModule } from './collection/collection.module';
import { CommentModule } from './comments/comments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(join(__dirname)),
      exclude: ['/*'],
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    AuthModule,
    PalletModule,
    PalletFilterModule,
    CollectionModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
