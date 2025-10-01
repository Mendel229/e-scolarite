import { Test, TestingModule } from '@nestjs/testing';
import { NiveauxController } from './niveaux.controller';
import { NiveauxService } from './niveaux.service';

describe('NiveauxController', () => {
  let controller: NiveauxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiveauxController],
      providers: [NiveauxService],
    }).compile();

    controller = module.get<NiveauxController>(NiveauxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
