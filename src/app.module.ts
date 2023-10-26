import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { PrismaService } from 'infra/database/prisma/prisma.service';

import { AuthModule } from './services/auth/auth.module';
import { PendaftaranModule } from './services/pendaftaran/pendaftaran.module';

@Module({
  imports: [CacheModule.register(), PendaftaranModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
