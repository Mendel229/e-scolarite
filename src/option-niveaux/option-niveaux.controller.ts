import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionNiveauxService } from './option-niveaux.service';
import { CreateOptionNiveauDto } from './dto/create-option-niveau.dto';
import { UpdateOptionNiveauDto } from './dto/update-option-niveau.dto';

@Controller('option-niveaux')
export class OptionNiveauxController {
  constructor(private readonly optionNiveauxService: OptionNiveauxService) {}

  @Post()
  create(@Body() createOptionNiveauDto: CreateOptionNiveauDto) {
    return this.optionNiveauxService.create(createOptionNiveauDto);
  }

  @Get()
  findAll() {
    return this.optionNiveauxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionNiveauxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionNiveauDto: UpdateOptionNiveauDto) {
    return this.optionNiveauxService.update(+id, updateOptionNiveauDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionNiveauxService.remove(+id);
  }
}
