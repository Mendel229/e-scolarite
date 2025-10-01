import { Injectable } from '@nestjs/common';
import { CreateFiliereDto } from './dto/create-filiere.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filiere } from './entities/filiere.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/utils/apiresponse.util';

@Injectable()
export class FilieresService {

  constructor(
    @InjectRepository(Filiere)
    private filiereRepository: Repository<Filiere>,
  ) {}

  async create(createFiliereDto: CreateFiliereDto): Promise<ApiResponse> {
    const filiere = this.filiereRepository.create(createFiliereDto);
    this.filiereRepository.save(filiere);
    return new ApiResponse(true, filiere, 'Filiere créée avec succès', 201);
  }

  async findAll(): Promise<ApiResponse> {
    const filieres = await this.filiereRepository.find({ relations: ['options'] });
    return new ApiResponse(true, filieres, 'Liste des filieres récupérée', 200);
  }

  async findOne(id: number): Promise<ApiResponse> {
    const filiere = await this.filiereRepository.findOne({
      where: { id },
      relations: ['options'],
    });

    if (!filiere) {
      return new ApiResponse(false, null, `Filiere avec id ${id} introuvable`, 404);
    }
    return new ApiResponse(true, filiere, 'Filiere récupérée avec succès', 200);
  }

  async update(id: number, updateFiliereDto: UpdateFiliereDto): Promise<ApiResponse> {
    const filiere = await this.filiereRepository.findOne({ where: { id } });
    if (!filiere) {
      return new ApiResponse(false, null, `Filiere avec id ${id} introuvable`, 404);
    }
    Object.assign(filiere, updateFiliereDto);
    await this.filiereRepository.save(filiere);
    return new ApiResponse(true, filiere, 'Filiere mise à jour avec succès', 200);
  }

  async remove(id: number): Promise<ApiResponse> {
    const filiere = await this.filiereRepository.findOne({ where: { id } });
    if (!filiere) {
      return new ApiResponse(false, null, `Filiere avec id ${id} introuvable`, 404);
    }
    await this.filiereRepository.delete(id);
    return new ApiResponse(true, null, `Filiere avec id ${id} supprimée avec succès`, 200);
  }
}