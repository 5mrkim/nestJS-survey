import { UpdateChoiceDto } from './dto/update-choice.dto';
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
  async updateChoice(id: number, data: UpdateChoiceDto) {
    await this.choiceRepository.update(id, { ...data });
    return;
  }
  async deleteChoice(id: number) {
    const Choice = await this.choiceRepository.findBy({ choice_id: id });
    if (Choice) return this.choiceRepository.remove(Choice);
  }
  async getAllChoice(id: number) {
    const question_id = Number(id);
    const result = await this.choiceRepository.findBy({
      question: {
        question_id: question_id,
      },
    });
    return result;
  }
}
