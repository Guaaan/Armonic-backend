import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { ClinicaService } from './clinica.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';

@Controller('clinica')
export class ClinicaController {
  constructor(private readonly clinicaService: ClinicaService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClinicaDto: CreateClinicaDto) {
    return this.clinicaService.create(createClinicaDto);
  }

  @Get()
  findAll() {
    return this.clinicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicaService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClinicaDto: UpdateClinicaDto) {
    return this.clinicaService.update(+id, updateClinicaDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicaService.remove(+id);
  }
}
