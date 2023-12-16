import { AnswerModule } from './answer.module';
import { AnswerController } from './answer.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AnswerModule],
      providers: [AnswerService],
      controllers: [AnswerController],
    }).compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
