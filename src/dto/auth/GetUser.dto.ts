import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

export class getUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the user.',
    example: 'f7187c19-6206-46ed-a0d2-942585f8c510',
  })
  id: string;
}
