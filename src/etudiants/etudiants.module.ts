import { Module } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsController } from './etudiants.controller';

@Module({
  controllers: [EtudiantsController],
  providers: [EtudiantsService],
})
export class EtudiantsModule {}
