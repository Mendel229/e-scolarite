import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NiveauxService } from './niveaux.service';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';

@Controller('niveaux')
export class NiveauxController {
  constructor(private readonly niveauxService: NiveauxService) {}

  @Post()
  create(@Body() createNiveauDto: CreateNiveauDto) {
    return this.niveauxService.create(createNiveauDto);
  }

  @Get()
  findAll() {
    return this.niveauxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.niveauxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNiveauDto: UpdateNiveauDto) {
    return this.niveauxService.update(+id, updateNiveauDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.niveauxService.remove(+id);
  }
}
