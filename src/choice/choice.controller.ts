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

  @ApiOperation({
    description: '선택지조회',
    summary: '선택지 조회',
  })
  @Get(':id')
  find() {}

  @Post(':id')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: CreateChoiceDto,
  ) {
    return this.choiceService.createChoice(id, data);
  }

  @Put()
  update() {}

  @Delete()
  delete() {}
}
