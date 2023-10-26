import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../infra/database/prisma/prisma.service';

@Injectable()
export class PendaftaranService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProvinsi() {
    try {
      const provinsi = await this.prisma.provinsi.findMany();

      if (!provinsi) {
        throw new NotFoundException('No provinsi found');
      }

      return provinsi;
    } catch (error) {
      console.error('Error in findAllProvinsi:', error);

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
