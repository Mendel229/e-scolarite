import { Module } from '@nestjs/common';
import { OptionNiveauxService } from './option-niveaux.service';
import { OptionNiveauxController } from './option-niveaux.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionNiveau } from './entities/option-niveau.entity';
import { Option } from 'src/options/entities/option.entity';
import { Niveau } from 'src/niveaux/entities/niveau.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OptionNiveau, Option, Niveau])],
  controllers: [OptionNiveauxController],
  providers: [OptionNiveauxService],
})
export class OptionNiveauxModule {}
