import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { NacionalidadService } from './nacionalidad.service';
import { CreateNacionalidadDto } from './dto/create-nacionalidad.dto';
import { UpdateNacionalidadDto } from './dto/update-nacionalidad.dto';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@Controller('nacionalidad')
export class NacionalidadController {
  constructor(private readonly nacionalidadService: NacionalidadService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNacionalidadDto: CreateNacionalidadDto) {
    return this.nacionalidadService.create(createNacionalidadDto);
  }

  @Get()
  findAll() {
    return this.nacionalidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nacionalidadService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateNacionalidadDto: UpdateNacionalidadDto) {
    return this.nacionalidadService.update(+id, updateNacionalidadDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nacionalidadService.remove(+id);
  }
}
