import { SurveyUpdateDto } from './dto/update-survey.dto';
import { SurveyCreateDto } from './dto/create-survey.dto';
import { Survey } from '../entity/survey.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}
  async find() {
    return this.surveyRepository.find();
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
}
