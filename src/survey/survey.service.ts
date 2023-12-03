import { SurveyCreateDto } from './dto/create-survey.dto';
import { Survey } from '../entity/survey.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async createSurvey(data: SurveyCreateDto) {
    return await this.surveyRepository.save(data);
  }
}
