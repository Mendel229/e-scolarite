import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { Filiere } from 'src/filieres/entities/filiere.entity';
import { ApiResponse } from 'src/utils/apiresponse.util';

@Injectable()
export class OptionsService {

  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,

    @InjectRepository(Filiere)
    private filiereRepository: Repository<Filiere>,
  ){}

  async create(createOptionDto: CreateOptionDto): Promise<ApiResponse> {
    const filiere = await this.filiereRepository.findOne({
      where: { id: createOptionDto.filiereId },
    });

    if (!filiere) {
      return new ApiResponse(false, null, `Filiere avec id ${createOptionDto.filiereId} introuvable`, 404);
    }

    const option = await this.optionRepository.create({
      codeOpt: createOptionDto.codeOpt,
      libelleOpt: createOptionDto.libelleOpt,
      filiere: filiere,
    });
    this.optionRepository.save(option);
    return new ApiResponse(true, option, 'Option créée avec succès', 201);
  }

  async findAll(): Promise<ApiResponse> {
    const options = await this.optionRepository.find({
      relations: ['filiere', 'optionNiveau', 'etudiants'],
    });

    return new ApiResponse(true, options, 'Liste des options récupérée', 200);
  }

  async findOne(id: number): Promise<ApiResponse> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['filiere', 'optionNiveau', 'etudiants'],
    });

    if (!option) {
      return new ApiResponse(false, null, `Option avec id ${id} introuvable`, 404);
    }

    return new ApiResponse(true, option, 'Option récupérée avec succès', 200);
  }

  async update(id: number, updateOptionDto: UpdateOptionDto): Promise<ApiResponse> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['filiere'],
    });

    if (!option) {
      return new ApiResponse(false, null, `Option avec id ${id} introuvable`, 404);
    }

    if (updateOptionDto.filiereId) {
      const filiere = await this.filiereRepository.findOne({
        where: { id: updateOptionDto.filiereId },
      });

      if (!filiere) {
        return new ApiResponse(false, null, `Filiere avec id ${updateOptionDto.filiereId} introuvable`, 404);
      }

      option.filiere = filiere;
    }

    Object.assign(option, updateOptionDto);
    await this.optionRepository.save(option);
    return new ApiResponse(true, option, 'Option mise à jour avec succès', 200);
  }


  async remove(id: number): Promise<ApiResponse> {
    const option = await this.optionRepository.findOne({where: {id}});
    if(!option){
      return new ApiResponse(false, null, `Option avec id ${id} introuvable`, 404);
    }
    await this.optionRepository.delete(id);
    return new ApiResponse(true, null, `Option avec id ${id} supprimée avec succès`, 200);
  }
}