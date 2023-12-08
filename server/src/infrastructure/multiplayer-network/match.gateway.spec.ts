import { Test, TestingModule } from '@nestjs/testing';
import { MatchGateway } from './match.gateway';

describe('MatchGateway', () => {
  let gateway: MatchGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchGateway],
    }).compile();

    gateway = module.get<MatchGateway>(MatchGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
