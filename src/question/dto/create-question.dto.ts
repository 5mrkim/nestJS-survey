import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '문항 제목',
    required: true,
    example: 4,
  })
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '문항 점수',
    required: true,
    example: 10,
  })
  score: number;
}
