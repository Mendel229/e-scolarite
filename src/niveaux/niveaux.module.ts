import { Module } from '@nestjs/common';
import { NiveauxService } from './niveaux.service';
import { NiveauxController } from './niveaux.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Niveau } from './entities/niveau.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Niveau])],
  controllers: [NiveauxController],
  providers: [NiveauxService],
})
export class NiveauxModule {}
