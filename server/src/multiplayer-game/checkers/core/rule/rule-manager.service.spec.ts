import { Test, TestingModule } from '@nestjs/testing';
import { RuleManagerService } from './rule-manager.service';

describe('RuleManagerService', () => {
  let service: RuleManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleManagerService],
    }).compile();

    service = module.get<RuleManagerService>(RuleManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
