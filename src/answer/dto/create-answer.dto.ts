import { ApiProperty } from '@nestjs/swagger';

export class AnswerCreateDto {
  @ApiProperty({
    description: '답안지 Array',
    example: [
      {
        questionId: 1,
        choiceId: 1,
      },
    ],
  })
  answersArray: [
    {
      questionId: number;
      choiceId: number;
    },
  ];
}
