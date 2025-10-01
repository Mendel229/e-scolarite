import { Injectable } from '@nestjs/common';
import { CreateOptionNiveauDto } from './dto/create-option-niveau.dto';
import { UpdateOptionNiveauDto } from './dto/update-option-niveau.dto';

@Injectable()
export class OptionNiveauxService {
  create(createOptionNiveauDto: CreateOptionNiveauDto) {
    return 'This action adds a new optionNiveau';
  }

  findAll() {
    return `This action returns all optionNiveaux`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionNiveau`;
  }

  update(id: number, updateOptionNiveauDto: UpdateOptionNiveauDto) {
    return `This action updates a #${id} optionNiveau`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionNiveau`;
  }
}
