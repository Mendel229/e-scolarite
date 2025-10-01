import { Module } from '@nestjs/common';
import { TranchesService } from './tranches.service';
import { TranchesController } from './tranches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tranch } from './entities/tranch.entity';
import { OptionNiveau } from 'src/option-niveaux/entities/option-niveau.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tranch, OptionNiveau])],
  controllers: [TranchesController],
  providers: [TranchesService],
})
export class TranchesModule {}
