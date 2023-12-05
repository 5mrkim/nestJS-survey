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
} from '@nestjs/common';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  @ApiOperation({
    summary: '질문생성 API',
    description: '질문생성 API',
  })
  create(@Body(new ValidationPipe()) data: QuestionCreateDto) {
    return this.questionService.createQuestion(data);
  }

  @Put()
  @ApiOperation({
    summary: '질문 수정 API',
    description: '질문 수정 API',
  })
  update() {}

  @Get()
  @ApiOperation({
    summary: '질문 조회 ',
    description: '질문 조회 API',
  })
  find() {}

  @Delete()
  @ApiOperation({
    summary: '질문 삭제 API',
    description: '질문 삭제 API',
  })
  delete() {}
}
