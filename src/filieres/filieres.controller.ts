import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilieresService } from './filieres.service';
import { CreateFiliereDto } from './dto/create-filiere.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';

@Controller('filieres')
export class FilieresController {
  constructor(private readonly filieresService: FilieresService) {}

  @Post()
  create(@Body() createFiliereDto: CreateFiliereDto) {
    return this.filieresService.create(createFiliereDto);
  }

  @Get()
  findAll() {
    return this.filieresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filieresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiliereDto: UpdateFiliereDto) {
    return this.filieresService.update(+id, updateFiliereDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filieresService.remove(+id);
  }
}
