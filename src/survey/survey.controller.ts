import { PageReqDto } from './../common/page-dto';
import { SurveyUpdateDto } from './dto/update-survey.dto';
import { SurveyCreateDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  ValidationPipe,
  HttpException,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiProperty,
  ApiBody,
  ApiExtraModels,
} from '@nestjs/swagger';

@ApiTags('Survey')
@ApiExtraModels(PageReqDto)
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  @ApiOperation({
    description: '설문지(전체) 조회 API',
    summary: '설문지 조회 API',
  })
  find(@Query() { pageNum, size }: PageReqDto) {
    return this.surveyService.find();
  }
  @Post()
  @ApiOperation({
    description: '설문지 create API',
    summary: '설문지 create API',
  })
  @ApiBody({ type: SurveyCreateDto })
  create(@Body(new ValidationPipe()) data: { title: string }) {
    return this.surveyService.createSurvey(data);
  }

  @Put(':id')
  @ApiOperation({
    description: '설문지 수정 API',
    summary: '설문지 수정',
  })
  @ApiBody({ type: SurveyCreateDto })
  update(
    @Body(new ValidationPipe()) data: SurveyUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.surveyService.updateSurvey(data, id);
  }

  @Delete(':id/delete')
  @ApiOperation({
    description: '설문지 삭제 API',
    summary: '설문지 삭제 API',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.delete(id);
  }

  @Get(':surveyId')
  @ApiOperation({
    description: '설문지(질문/답변)조회 API',
    summary: '설문지(질문/답변) API',
  })
  getAllQuestions(@Param('surveyId', ParseIntPipe) surveyId: number) {
    return this.surveyService.getAllQuestions(surveyId);
  }
}
