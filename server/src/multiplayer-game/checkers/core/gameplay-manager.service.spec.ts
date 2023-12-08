import { Test, TestingModule } from '@nestjs/testing';
import { GameplayManagerService } from './gameplay-manager.service';

describe('GameplayManagerService', () => {
  let service: GameplayManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameplayManagerService],
    }).compile();

    service = module.get<GameplayManagerService>(GameplayManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
