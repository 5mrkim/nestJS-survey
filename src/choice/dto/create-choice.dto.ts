import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChoiceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '컨텐츠',
    example: '아니다',
    required: true,
  })
  contents: string;
}
