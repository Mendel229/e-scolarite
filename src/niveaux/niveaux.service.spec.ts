import { Test, TestingModule } from '@nestjs/testing';
import { NiveauxService } from './niveaux.service';

describe('NiveauxService', () => {
  let service: NiveauxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiveauxService],
    }).compile();

    service = module.get<NiveauxService>(NiveauxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
