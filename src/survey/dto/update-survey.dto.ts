import { SurveyCreateDto } from './create-survey.dto';
import { PartialType } from '@nestjs/swagger';

export class SurveyUpdateDto extends PartialType(SurveyCreateDto) {}
