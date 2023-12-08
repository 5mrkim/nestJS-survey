import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerService } from './answer.service';
import { AnswerCreateDto } from './dto/create-answer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

@ApiTags('답변')
@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @ApiOperation({
    description: '답변 생성 API',
    summary: '답변 생성 API',
  })
  @Post()
  create(@Body(new ValidationPipe()) data: AnswerCreateDto) {
    return this.answerService.createAnswer(data);
  }

  @ApiOperation({
    description: '답변 수정 API',
    summary: '답변 수정 API',
  })
  @Put(':answerId')
  update(
    @Param('answerId', ParseIntPipe) answerId: number,
    @Body(new ValidationPipe()) data: UpdateAnswerDto,
  ) {
    console.log(typeof answerId);
    return this.answerService.updateAnswer(answerId, data);
  }

  @ApiOperation({
    description: '답변 단일 조회 API',
    summary: '답변 조회 API',
  })
  @ApiOperation({
    description: '답변 삭제 API',
    summary: '답변 삭제 API',
  })
  @Delete(':answerId')
  delete(@Param('answerId', ParseIntPipe) answerId: number) {
    return this.answerService.deleteAnswer(answerId);
  }
  @ApiOperation({
    description: '답변 단일 조회 API',
    summary: '답변 조회 API',
  })
  @Get(':choiceId')
  findOneAnswer(@Param(':choiceId', ParseIntPipe) choiceId: number) {
    return this.answerService.findAnswer(choiceId);
  }
}
