import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '질문 pk',
    example: 1,
    required: true,
  })
  questionId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '선택지 pk',
    example: 1,
    required: true,
  })
  choiceId: number;
}
