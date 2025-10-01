import { Module } from '@nestjs/common';
import { OptionNiveauxService } from './option-niveaux.service';
import { OptionNiveauxController } from './option-niveaux.controller';

@Module({
  controllers: [OptionNiveauxController],
  providers: [OptionNiveauxService],
})
export class OptionNiveauxModule {}
