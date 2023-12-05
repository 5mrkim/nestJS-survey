import { QuestionCreateDto } from './dto/create-question.dto';
import { Question } from './../entity/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private surveyRepository: Repository<Question>,
  ) {}
  async createQuestion(data: QuestionCreateDto) {
    return this.surveyRepository.save(data);
  }
}
