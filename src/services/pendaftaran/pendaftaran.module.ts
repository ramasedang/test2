import { Module } from '@nestjs/common';

import { PrismaService } from 'infra/database/prisma/prisma.service';

import { PendaftaranController } from './pendaftaran.controller';
import { PendaftaranService } from './pendaftaran.service';

@Module({
  providers: [PendaftaranService, PrismaService],
  controllers: [PendaftaranController],
})
export class PendaftaranModule {}
