import { AnswerController } from './answer.controller';
import { Answer } from './../entity/answer.entity';
import { Question } from './../entity/question.entity';
import { Survey } from './../entity/survey.entity';
import { Choice } from './../entity/choice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Choice, Survey, Question, Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
