import { Test, TestingModule } from '@nestjs/testing';
import { OptionNiveauxService } from './option-niveaux.service';

describe('OptionNiveauxService', () => {
  let service: OptionNiveauxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionNiveauxService],
    }).compile();

    service = module.get<OptionNiveauxService>(OptionNiveauxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
