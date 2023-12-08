import { Test, TestingModule } from '@nestjs/testing';
import { CheckersMatchService } from './checkers-match.service';

describe('CheckersMatchService', () => {
  let service: CheckersMatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckersMatchService],
    }).compile();

    service = module.get<CheckersMatchService>(CheckersMatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
