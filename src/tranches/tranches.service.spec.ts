import { Test, TestingModule } from '@nestjs/testing';
import { TranchesService } from './tranches.service';

describe('TranchesService', () => {
  let service: TranchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranchesService],
    }).compile();

    service = module.get<TranchesService>(TranchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
