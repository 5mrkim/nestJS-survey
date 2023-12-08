import { PathIdDto } from './dto/question-path.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
import { QuestionCreateDto } from './dto/create-question.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post(':id')
  @ApiOperation({
    summary: '질문생성 API',
    description: '질문생성 API',
  })
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: QuestionCreateDto,
  ) {
    console.log(id);
    return this.questionService.createQuestion(id, data);
  }

  @Put(':id')
  @ApiOperation({
    summary: '질문 수정 API',
    description: '질문 수정 API',
  })
  update(
    @Param('id', ParseIntPipe) id: PathIdDto,
    @Body(new ValidationPipe()) data: UpdateQuestionDto,
  ) {
    return this.questionService.updateQuestion(id, data);
  }

  @Get()
  @ApiOperation({
    summary: '질문 조회 ',
    description: '질문 조회 API',
  })
  find() {}

  @Delete(':id')
  @ApiOperation({
    summary: '질문 삭제 API',
    description: '질문 삭제 API',
  })
  delete(@Param('id', ParseIntPipe) id: PathIdDto) {
    return this.questionService.deleteQuestion(id);
  }
}
