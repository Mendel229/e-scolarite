import { Inject, Injectable } from '@nestjs/common';
import { CreateOptionNiveauDto } from './dto/create-option-niveau.dto';
import { UpdateOptionNiveauDto } from './dto/update-option-niveau.dto';
import { Repository } from 'typeorm';
import { OptionNiveau } from './entities/option-niveau.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from 'src/options/entities/option.entity';
import { Niveau } from 'src/niveaux/entities/niveau.entity';
import { ApiResponse } from 'src/utils/apiresponse.util';

@Injectable()
export class OptionNiveauxService {

  constructor(
    @InjectRepository(OptionNiveau)
    private optionNiveauRepository: Repository<OptionNiveau>,

    @InjectRepository(Option)
    private optionRepository: Repository<Option>,

    @InjectRepository(Niveau)
    private niveauRepository: Repository<Niveau>,
  ) {}


  async create(createOptionNiveauDto: CreateOptionNiveauDto): Promise<ApiResponse> {
    const option = await this.optionRepository.findOne({
      where: { id: createOptionNiveauDto.optionId },
    });
    if (!option) {
      return new ApiResponse(false, null, `Option avec id ${createOptionNiveauDto.optionId} introuvable`, 404);
    }

    const niveau = await this.niveauRepository.findOne({
      where: { id: createOptionNiveauDto.niveauId },
    });
    if (!niveau) {
      return new ApiResponse(false, null, `Niveau avec id ${createOptionNiveauDto.niveauId} introuvable`, 404);
    }

    const optionNiveau = this.optionNiveauRepository.create({
      optionId: createOptionNiveauDto.optionId,
      niveauId: createOptionNiveauDto.niveauId,
      montant: createOptionNiveauDto.montant,
      option,
      niveau,
    });

    await this.optionNiveauRepository.save(optionNiveau);
    return new ApiResponse(true, optionNiveau, 'OptionNiveau créée avec succès', 201);
  }

  async findAll(): Promise<ApiResponse> {
    const optionNiveaux = await this.optionNiveauRepository.find({
      relations: ['option', 'niveau', 'tranches'],
    });
    return new ApiResponse(true, optionNiveaux, 'Liste des optionNiveaux récupérée', 200);
  }

  async findOne(optionId: number, niveauId: number): Promise<ApiResponse> {
    const optionNiveau = await this.optionNiveauRepository.findOne({
      where: { optionId, niveauId },
      relations: ['option', 'niveau', 'tranches'],
    });

    if (!optionNiveau) {
      return new ApiResponse(false, null, `OptionNiveau avec optionId ${optionId} et niveauId ${niveauId} introuvable`, 404);
    }

    return new ApiResponse(true, optionNiveau, 'OptionNiveau récupérée avec succès', 200);
  }

  async update(optionId: number, niveauId: number, updateOptionNiveauDto: UpdateOptionNiveauDto): Promise<ApiResponse> {
    const optionNiveau = await this.optionNiveauRepository.findOne({
      where: { optionId, niveauId },
      relations: ['option', 'niveau'],
    });

    if (!optionNiveau) {
      return new ApiResponse(false, null, `OptionNiveau avec optionId ${optionId} et niveauId ${niveauId} introuvable`, 404);
    }

    // Vérifier si option à mettre à jour existe
    if (updateOptionNiveauDto.optionId) {
      const option = await this.optionRepository.findOne({ where: { id: updateOptionNiveauDto.optionId } });
      if (!option) {
        return new ApiResponse(false, null, `Option avec id ${updateOptionNiveauDto.optionId} introuvable`, 404);
      }
      optionNiveau.option = option;
      optionNiveau.optionId = updateOptionNiveauDto.optionId;
    }

    // Vérifier si niveau à mettre à jour existe
    if (updateOptionNiveauDto.niveauId) {
      const niveau = await this.niveauRepository.findOne({ where: { id: updateOptionNiveauDto.niveauId } });
      if (!niveau) {
        return new ApiResponse(false, null, `Niveau avec id ${updateOptionNiveauDto.niveauId} introuvable`, 404);
      }
      optionNiveau.niveau = niveau;
      optionNiveau.niveauId = updateOptionNiveauDto.niveauId;
    }

    if (updateOptionNiveauDto.montant !== undefined) {
      optionNiveau.montant = updateOptionNiveauDto.montant;
    }

    await this.optionNiveauRepository.save(optionNiveau);
    return new ApiResponse(true, optionNiveau, 'OptionNiveau mise à jour avec succès', 200);
  }


  async remove(optionId: number, niveauId: number): Promise<ApiResponse> {
    const optionNiveau = await this.optionNiveauRepository.findOne({
      where: { optionId, niveauId },
      relations: ['option', 'niveau'],
    });

    if (!optionNiveau) {
      return new ApiResponse(false, null, `OptionNiveau avec optionId ${optionId} et niveauId ${niveauId} introuvable`, 404);
    }

    await this.optionNiveauRepository.delete({ optionId, niveauId });
    return new ApiResponse(true, null, `OptionNiveau supprimée avec succès`, 200);
  }
}
