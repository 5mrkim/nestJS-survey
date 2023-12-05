import { ChoiceController } from './choice.controller';
import { Survey } from './../entity/survey.entity';
import { Question } from './../entity/question.entity';
import { Choice } from './../entity/choice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Controller } from '@nestjs/common';
import { ChoiceService } from './choice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Choice, Question, Survey])],
  controllers: [ChoiceController],
  providers: [ChoiceService],
  exports: [ChoiceService],
})
export class ChoiceModule {}
