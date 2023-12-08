import { PathIdDto } from './dto/question-path.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Survey } from './../entity/survey.entity';
import { Question } from './../entity/question.entity';
import { QuestionCreateDto } from './dto/create-question.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}
  async createQuestion(id: number, data: QuestionCreateDto) {
    const survey = await this.surveyRepository.findOneBy({ survey_id: id });
    console.log('survey', survey?.title);
    if (survey) {
      const questions = await this.questionRepository.create({
        survey: {
          survey_id: id,
        },
        title: data?.title,
        score: data?.score,
      });
      return this.questionRepository.save(questions);
    }
  }

  async updateQuestion(id: PathIdDto, data: UpdateQuestionDto) {
    const question = await this.questionRepository.findOneBy({
      question_id: Number(id),
    });
    if (question) {
      return this.questionRepository.update(Number(id), { ...data });
    }
  }

  async deleteQuestion(id: PathIdDto) {
    const question = await this.questionRepository.findOneBy({
      question_id: Number(id),
    });
    if (question) {
      return this.questionRepository.remove(question);
    }
  }
}
