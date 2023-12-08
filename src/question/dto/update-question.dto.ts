import { PartialType } from '@nestjs/swagger';
import { QuestionCreateDto } from './create-question.dto';
export class UpdateQuestionDto extends PartialType(QuestionCreateDto) {}
