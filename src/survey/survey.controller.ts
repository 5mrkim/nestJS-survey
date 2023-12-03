import { SurveyCreateDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Survey')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @ApiOperation({
    description: '설문지 create API',
    summary: '설문지 create API',
  })
  create(@Body(new ValidationPipe()) data: SurveyCreateDto) {
    return this.surveyService.createSurvey(data);
  }
}
