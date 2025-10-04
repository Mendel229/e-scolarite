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

  @Get(':optionId/:niveauId')
  findOne(@Param('optionId') optionId: string, @Param('niveauId') niveauId: string) {
    return this.optionNiveauxService.findOne(+optionId, +niveauId);
  }

  @Patch(':optionId/:niveauId')
  update(@Param('optionId') optionId: string, @Param('niveauId') niveauId: string, @Body() updateOptionNiveauDto: UpdateOptionNiveauDto) {
    return this.optionNiveauxService.update(+optionId, +niveauId, updateOptionNiveauDto);
  }

  @Delete(':optionId/:niveauId')
  remove(@Param('optionId') optionId: string, @Param('niveauId') niveauId: string) {
    return this.optionNiveauxService.remove(+optionId, +niveauId);
  }
}
