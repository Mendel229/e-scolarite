import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranchesService } from './tranches.service';
import { CreateTranchDto } from './dto/create-tranch.dto';
import { UpdateTranchDto } from './dto/update-tranch.dto';

@Controller('tranches')
export class TranchesController {
  constructor(private readonly tranchesService: TranchesService) {}

  @Post()
  create(@Body() createTranchDto: CreateTranchDto) {
    return this.tranchesService.create(createTranchDto);
  }

  @Get()
  findAll() {
    return this.tranchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tranchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranchDto: UpdateTranchDto) {
    return this.tranchesService.update(+id, updateTranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tranchesService.remove(+id);
  }
}
