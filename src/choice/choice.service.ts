import { CreateChoiceDto } from './dto/create-choice.dto';
import { Question } from './../entity/question.entity';
import { Choice } from './../entity/choice.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,

    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async createChoice(id: number, data: CreateChoiceDto) {
    const question = await this.questionRepository.findBy({ question_id: id });

    if (question) {
      const newChoice = this.choiceRepository.create({
        contents: data.contents,
        question: { question_id: id },
      });

      const result = await this.choiceRepository.save(newChoice);
      return result;
    }
  }
}
