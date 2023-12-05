import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PathIdDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'question pk',
    required: true,
    example: 2,
  })
  id: number;
}
