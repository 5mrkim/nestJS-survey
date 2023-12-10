import { QuestionController } from './question.controller';
import { QuestionModule } from './question.module';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [QuestionModule],
      controllers: [QuestionController],
      providers: [QuestionService],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
