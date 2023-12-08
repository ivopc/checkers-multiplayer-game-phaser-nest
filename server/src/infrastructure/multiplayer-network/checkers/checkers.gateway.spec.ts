import { Test, TestingModule } from '@nestjs/testing';
import { CheckersGateway } from './checkers.gateway';

describe('CheckersGateway', () => {
  let gateway: CheckersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckersGateway],
    }).compile();

    gateway = module.get<CheckersGateway>(CheckersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
