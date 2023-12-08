import { Survey } from './../entity/survey.entity';
import { Choice } from './../entity/choice.entity';
import { Question } from './../entity/question.entity';
import { SurveyUpdateDto } from './dto/update-survey.dto';
import { SurveyCreateDto } from './dto/create-survey.dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
  ) {}
  async find(): Promise<Survey[] | null> {
    const survey = await this.surveyRepository.find({
      relations: ['questions'],
    });
    if (!survey.length) {
      return null; // 또는 다른 적절한 에러 처리
    }
    console.log(survey);
    return survey;
  }
  async createSurvey(data: { title: string }) {
    const { title } = data;
    return await this.surveyRepository.save({ title });
  }
  async updateSurvey(data: SurveyUpdateDto, id: number) {
    const surveyExistValidation = await this.surveyRepository.findOneBy({
      survey_id: id,
    });
    //컨트롤러에서 처리해야하는부분
    if (!surveyExistValidation) throw new NotFoundException('NOT_EXIST');
    if (surveyExistValidation) {
      return this.surveyRepository.update(id, { ...data });
    }
  }
  async delete(id: number) {
    const surveyExistValidation = await this.surveyRepository.findOneBy({
      survey_id: id,
    });
    //컨트롤러에서 처리해야하는부분
    if (!surveyExistValidation) throw new NotFoundException('NOT_EXIST');
    if (surveyExistValidation) {
      return this.surveyRepository.remove(surveyExistValidation);
    }
  }

  async getAllQuestions(surveyId: number) {
    const result = await this.surveyRepository.findOne({
      where: { survey_id: surveyId },
      relations: ['questions', 'questions.choices'],
    });
    return result;
  }
}
