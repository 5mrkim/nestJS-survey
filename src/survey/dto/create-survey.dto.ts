import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SurveyCreateDto {
  @ApiProperty({
    description: '작성자 아이디',
    required: true,
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
