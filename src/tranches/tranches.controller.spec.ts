import { Test, TestingModule } from '@nestjs/testing';
import { TranchesController } from './tranches.controller';
import { TranchesService } from './tranches.service';

describe('TranchesController', () => {
  let controller: TranchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranchesController],
      providers: [TranchesService],
    }).compile();

    controller = module.get<TranchesController>(TranchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
