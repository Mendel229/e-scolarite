import { Test, TestingModule } from '@nestjs/testing';
import { OptionNiveauxController } from './option-niveaux.controller';
import { OptionNiveauxService } from './option-niveaux.service';

describe('OptionNiveauxController', () => {
  let controller: OptionNiveauxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionNiveauxController],
      providers: [OptionNiveauxService],
    }).compile();

    controller = module.get<OptionNiveauxController>(OptionNiveauxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
