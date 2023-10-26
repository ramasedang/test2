import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { PendaftaranService } from './pendaftaran.service';

@ApiTags('Pendaftaran')
@Controller('pendaftaran')
export class PendaftaranController {
  constructor(private readonly pendaftaranService: PendaftaranService) {}

  @ApiOkResponse({
    description: 'Get all provinsi',
  })
  @Get('provinsi')
  async findAllProvinsi() {
    const provinsis = await this.pendaftaranService.findAllProvinsi();

    return {
      status: 'success',
      data: provinsis,
    };
  }
}
