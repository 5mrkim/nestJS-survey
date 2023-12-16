import { Survey } from './../entity/survey.entity';
import { SurveyService } from './survey.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Survey')
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  // @Query(() => [Survey])
  // surveys(): Promise<Survey[]> {
  //   return this.surveyService.find();
  // }
}
