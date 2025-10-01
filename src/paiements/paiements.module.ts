import { Module } from '@nestjs/common';
import { PaiementsService } from './paiements.service';
import { PaiementsController } from './paiements.controller';

@Module({
  controllers: [PaiementsController],
  providers: [PaiementsService],
})
export class PaiementsModule {}
