import { Injectable } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { Repository } from 'typeorm';
import { Option } from 'src/options/entities/option.entity';
import { Niveau } from 'src/niveaux/entities/niveau.entity';
import { ApiResponse } from 'src/utils/apiresponse.util';
import { OptionNiveau } from 'src/option-niveaux/entities/option-niveau.entity';
import { Readable } from 'stream';
import csv from 'csv-parser';
import * as streamifier from 'streamifier';

@Injectable()
export class EtudiantsService {

  constructor(
    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,

    @InjectRepository(OptionNiveau)
    private optionNiveauRepository: Repository<OptionNiveau>,
  ){}
  async create(createEtudiantDto: CreateEtudiantDto): Promise<ApiResponse> {
    const optionId = createEtudiantDto.optionId;
    const niveauId = createEtudiantDto.niveauId;
    const optionNiveau = await this.optionNiveauRepository.findOne({
      where: {optionId, niveauId}
    })
    if (!optionNiveau) {
      return new ApiResponse(false, null, `OptionNiveau avec id ${optionId} - ${niveauId} introuvable`, 404);
    }
    const etudiant = this.etudiantRepository.create({
      nom: createEtudiantDto.nom,
      prenom: createEtudiantDto.prenom,
      dateNais: createEtudiantDto.dateNais,
      email: createEtudiantDto.email,
      numTel: createEtudiantDto.numTel,
      optionNiveau: optionNiveau
    })
    return new ApiResponse(true, etudiant, 'Etudiant créé avec succès', 201);
  }

  async findAll() {
    const etudiants = await this.etudiantRepository.find()
    return new ApiResponse(true, etudiants, 'Liste des étudiants récupée avec succès', 200);
  }

  async findOne(id: number): Promise<ApiResponse> {
    const  etudiant = await this.etudiantRepository.findOne({
      where: {id}
    });
    if(!etudiant){
      return new ApiResponse(false, null, `Etudiant id ${id} introuvable`, 404)
    }
    return new ApiResponse(true, etudiant, `Etudiant id ${id} récupéré avec succès`, 200);
  }

  async update(id: number, updateEtudiantDto: UpdateEtudiantDto): Promise<ApiResponse> {
    const  etudiant = await this.etudiantRepository.findOne({
      where: {id}
    });
    if(!etudiant){
      return new ApiResponse(false, null, `Etudiant id ${id} introuvable`, 404)
    }
    Object.assign(etudiant, updateEtudiantDto);
    await this.etudiantRepository.save(etudiant);
    return new ApiResponse(true, etudiant, `Etudiant id ${id} modifié avec succès`, 200);
  }

  remove(id: number) {
    return `This action removes a #${id} etudiant`;
  }

  async importEtudiantFromCSV(file: Express.Multer.File): Promise<ApiResponse> {
    if (!file) {
      return new ApiResponse(false, null, 'Aucun fichier fourni', 400);
    }

    const created: Etudiant[] = [];
    const skipped: { row: any; reason: string }[] = [];
    const errors: { row: any; reason: string }[] = [];

    const stream = streamifier.createReadStream(file.buffer);

    try {
      for await (const row of stream.pipe(csv())) {
        const { nom, prenom, email, dateNais, numTel, optionId, niveauId } = row;

        // Vérification obligatoire
        if (!nom || !prenom || !email || !dateNais || !optionId || !niveauId) {
          skipped.push({ row, reason: 'Champs obligatoires manquants' });
          continue;
        }

        // Vérifier email unique
        const exist = await this.etudiantRepository.findOne({ where: { email } });
        if (exist) {
          skipped.push({ row, reason: 'Email déjà existant' });
          continue;
        }

        // Vérifier option et niveau
        const optionNiveau = await this.optionNiveauRepository.findOne({
          where: { optionId: Number(optionId), niveauId: Number(niveauId) }
        });
        if (!optionNiveau) {
          skipped.push({ row, reason: `OptionNiveau ${optionId}-${niveauId} introuvable` });
          continue;
        }

        // Vérifier date valide
        const date = new Date(dateNais);
        if (isNaN(date.getTime())) {
          errors.push({ row, reason: 'Date de naissance invalide' });
          continue;
        }

        // Création étudiant
        const etudiant = this.etudiantRepository.create({
          nom,
          prenom,
          email,
          dateNais: date,
          numTel,
          optionNiveau
        });

        const saved = await this.etudiantRepository.save(etudiant);
        created.push(saved);
      }

      const summary = {
        createdCount: created.length,
        skippedCount: skipped.length,
        errorsCount: errors.length,
        created,
        skipped,
        errors
      };

      return new ApiResponse(true, summary, `Import terminé: ${created.length} créés, ${skipped.length} ignorés, ${errors.length} erreurs`, 201);

    } catch (err) {
      return new ApiResponse(false, null, `Erreur lors de l'import CSV: ${err.message}`, 500);
    }
  }
}
