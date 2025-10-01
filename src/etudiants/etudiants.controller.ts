import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';

@Controller('etudiants')
export class EtudiantsController {
  constructor(private readonly etudiantsService: EtudiantsService) {}

  @Post()
  create(@Body() createEtudiantDto: CreateEtudiantDto) {
    return this.etudiantsService.create(createEtudiantDto);
  }

  @Get()
  findAll() {
    return this.etudiantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etudiantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtudiantDto: UpdateEtudiantDto) {
    return this.etudiantsService.update(+id, updateEtudiantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etudiantsService.remove(+id);
  }
}
