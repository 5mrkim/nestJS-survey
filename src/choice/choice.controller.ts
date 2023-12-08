import { UpdateChoiceDto } from './dto/update-choice.dto';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { ChoiceService } from './choice.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

@ApiTags('선택지')
@Controller('choice')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Get(':id')
  @ApiOperation({
    description: '선택지조회',
    summary: '선택지 조회',
  })
  find(@Param('id', ParseIntPipe) id: number) {
    return this.choiceService.getAllChoice(Number(id));
  }

  @Post(':id')
  @ApiOperation({
    description: '선택지 등록 API',
    summary: '선택지 등록 API',
  })
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: CreateChoiceDto,
  ) {
    return this.choiceService.createChoice(id, data);
  }

  @Put(':id')
  @ApiOperation({
    description: '선택지 수정 API',
    summary: '선택지 수정 API',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateChoiceDto,
  ) {
    return this.choiceService.updateChoice(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    description: '선택지 삭제 API',
    summary: '선택지 삭제 API',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.choiceService.deleteChoice(id);
  }
}
