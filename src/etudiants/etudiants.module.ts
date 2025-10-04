import { Module } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsController } from './etudiants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { OptionNiveau } from 'src/option-niveaux/entities/option-niveau.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant, OptionNiveau])],
  controllers: [EtudiantsController],
  providers: [EtudiantsService],
})
export class EtudiantsModule {}
