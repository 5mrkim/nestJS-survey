import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerCreateDto } from './dto/create-answer.dto';
import { Question } from './../entity/question.entity';
import { Choice } from './../entity/choice.entity';
import { Answer } from './../entity/answer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async createAnswer(data: AnswerCreateDto) {
    const answers: Array<any> = [];
    if (data) {
      for (const answer of data?.answersArray) {
        const result = this.answerRepository.create({
          user_id: 'SURVEY_USER',
          question: { question_id: answer.questionId },
          choice: { choice_id: answer.choiceId },
        });
        answers.push(result);
      }
      return this.answerRepository.save(answers);
    }
  }

  async updateAnswer(answerId: number, data: UpdateAnswerDto) {
    const { questionId, choiceId } = data;
    const answer = await this.answerRepository.findOne({
      where: {
        answer_id: answerId,
      },
    });
    if (!answer) throw new NotFoundException();

    await this.answerRepository.update(
      { answer_id: answerId },
      {
        question: { question_id: questionId },
        choice: { choice_id: choiceId },
      },
    );

    return;
  }

  async deleteAnswer(answerId: number) {
    const answer = await this.answerRepository.findOne({
      where: {
        answer_id: answerId,
      },
    });
    if (!answer) throw new NotFoundException();
    await this.answerRepository.remove(answer);
    return;
  }

  async findAnswer(choiceId: number) {
    const answer = await this.answerRepository.findOne({
      where: {
        choice: { choice_id: choiceId },
      },
    });
    return answer;
  }
}
