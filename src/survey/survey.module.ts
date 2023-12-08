import { SurveyResolver } from './survey.resolver';
import { Question } from './../entity/question.entity';
import { Choice } from './../entity/choice.entity';
import { SurveyController } from './survey.controller';
import { Survey } from './../entity/survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Choice, Question])],
  controllers: [SurveyController],
  providers: [SurveyService, SurveyResolver],
  exports: [SurveyService],
})
export class SurveyModule {}
