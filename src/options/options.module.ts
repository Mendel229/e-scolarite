import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filiere } from 'src/filieres/entities/filiere.entity';
import { Niveau } from 'src/niveaux/entities/niveau.entity';
import { Option } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filiere, Option])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
