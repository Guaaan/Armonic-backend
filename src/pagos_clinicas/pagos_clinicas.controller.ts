import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PagosClinicasService } from './pagos_clinicas.service';
import { CreatePagosClinicaDto } from './dto/create-pagos_clinica.dto';
import { UpdatePagosClinicaDto } from './dto/update-pagos_clinica.dto';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('pagos-clinicas')
export class PagosClinicasController {
  constructor(private readonly pagosClinicasService: PagosClinicasService) {}

  @Post()
  create(@Body() createPagosClinicaDto: CreatePagosClinicaDto) {
    return this.pagosClinicasService.create(createPagosClinicaDto);
  }

  @Get()
  findAll() {
    return this.pagosClinicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosClinicasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagosClinicaDto: UpdatePagosClinicaDto) {
    return this.pagosClinicasService.update(+id, updatePagosClinicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosClinicasService.remove(+id);
  }
}
