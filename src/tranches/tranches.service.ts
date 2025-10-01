import { Injectable } from '@nestjs/common';
import { CreateTranchDto } from './dto/create-tranch.dto';
import { UpdateTranchDto } from './dto/update-tranch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tranch } from './entities/tranch.entity';
import { ApiResponse } from 'src/utils/apiresponse.util';
import { OptionNiveau } from 'src/option-niveaux/entities/option-niveau.entity';

@Injectable()
export class TranchesService {

  constructor(
    @InjectRepository(Tranch)
    private trancheRepository: Repository<Tranch>,

    @InjectRepository(OptionNiveau)
    private optionNiveauRepository: Repository<OptionNiveau>,
  ){}
  async create(createTranchDto: CreateTranchDto): Promise<ApiResponse> {
    const optionNiveau = await this.optionNiveauRepository.findOne({
      where: {id: createTranchDto.optionNiveauId}
    })
    if (!optionNiveau) {
      return new ApiResponse(false, null, `Filiere avec id ${createTranchDto.optionNiveauId} introuvable`, 404);
    }
    const tranche = await this.trancheRepository.create({
      nom: createTranchDto.nom,
      montantTranche: createTranchDto.montantTranche,
      dateLimitePaie: createTranchDto.dateLimitePaie,
      optionNiveau: optionNiveau
    });
    await this.trancheRepository.save(tranche);
    return new ApiResponse(true, tranche, 'Tranche créée avec succès', 201);
  }

  async findAll(): Promise<ApiResponse> {
    const tranches = await this.trancheRepository.find({
      relations: ['optionNiveau']
    })
    return new ApiResponse(true, tranches, 'Liste des tranches récupérée', 200);
  }

  async findOne(id: number) {
    const tranche = await this.trancheRepository.findOne({
      where: {id},
      relations: ['optionNiveau']
    })
    if (!tranche) {
      return new ApiResponse(false, null, `Tranche avec id ${id} introuvable`, 404);
    }

    return new ApiResponse(true, tranche, 'Tranche récupérée avec succès', 200);
  }

  async update(id: number, updateTranchDto: UpdateTranchDto) {
    const tranche = await this.trancheRepository.findOne({
      where: {id},
      relations: ['optionNiveau']
    })
    if (!tranche) {
      return new ApiResponse(false, null, `Tranche avec id ${id} introuvable`, 404);
    }

    const optionNiveau = await this.optionNiveauRepository.findOne({
      where: { id: updateTranchDto.optionNiveauId },
    });

    if (!optionNiveau) {
      return new ApiResponse(false, null, `optionNiveau avec id ${updateTranchDto.optionNiveauId} introuvable`, 404);
    }

    tranche.optionNiveau = optionNiveau;
    Object.assign(tranche, updateTranchDto);
    await this.trancheRepository.save(tranche);
    return new ApiResponse(true, tranche, 'Tranche mise à jour avec succès', 200);
  }

  async remove(id: number) {
    const tranche = await this.trancheRepository.findOne({
      where: {id},
      relations: ['optionNiveau']
    })
    if (!tranche) {
      return new ApiResponse(false, null, `Tranche avec id ${id} introuvable`, 404);
    }
    await this.trancheRepository.delete(id);
    return new ApiResponse(true, null, `Tranche avec id ${id} supprimée avec succès`, 200);
  }
}
