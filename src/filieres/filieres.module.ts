import { Module } from '@nestjs/common';
import { FilieresService } from './filieres.service';
import { FilieresController } from './filieres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filiere } from './entities/filiere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filiere])],
  controllers: [FilieresController],
  providers: [FilieresService],
})
export class FilieresModule {}
