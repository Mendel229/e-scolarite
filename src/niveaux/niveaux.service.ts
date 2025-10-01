import { Injectable } from '@nestjs/common';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Niveau } from './entities/niveau.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/utils/apiresponse.util';

@Injectable()
export class NiveauxService {

  constructor(
    @InjectRepository(Niveau)
    private niveauRepository: Repository<Niveau>
  ){}
  async create(createNiveauDto: CreateNiveauDto): Promise<ApiResponse> {
    const niveau = this.niveauRepository.create(createNiveauDto);
    this.niveauRepository.save(niveau)
    return new ApiResponse(true, niveau, 'Niveau créée avec succès', 201);
  }

  async findAll(): Promise<ApiResponse> {
    const niveaux = await this.niveauRepository.find({ relations: ['optionNiveau']});
    return new ApiResponse(true, niveaux, 'Liste des niveaux récupérée', 200);
  }

  async findOne(id: number): Promise<ApiResponse> {
    const niveau = await this.niveauRepository.findOne({
      where: {id},
      relations: ['optionNiveau']
    })
    if (!niveau) {
      return new ApiResponse(false, null, `Niveau avec id ${id} introuvable`, 404);
    }
    return new ApiResponse(true, niveau, 'Niveau récupérée avec succès', 200);
  }

  async update(id: number, updateNiveauDto: UpdateNiveauDto): Promise<ApiResponse> {
    const niveau = await this.niveauRepository.findOne({where: {id}})
    if (!niveau) {
      return new ApiResponse(false, null, `Niveau avec id ${id} introuvable`, 404);
    }
    Object.assign(niveau, updateNiveauDto);
    await this.niveauRepository.save(niveau);
    return new ApiResponse(true, niveau, 'Niveau mise à jour avec succès', 200);
  }

  async remove(id: number): Promise<ApiResponse> {
    const niveau = await this.niveauRepository.findOne({where: {id}})
    if (!niveau) {
      return new ApiResponse(false, null, `Niveau avec id ${id} introuvable`, 404);
    }
    await this.niveauRepository.delete(id);
    return new ApiResponse(true, null, `Niveau avec id ${id} supprimée avec succès`, 200);
  }
}
