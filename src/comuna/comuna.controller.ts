import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { ComunaService } from './comuna.service';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';

@Controller('comuna')
export class ComunaController {
  constructor(private readonly comunaService: ComunaService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createComunaDto: CreateComunaDto) {
    return this.comunaService.create(createComunaDto);
  }

  @Get()
  findAll() {
    return this.comunaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunaService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateComunaDto: UpdateComunaDto) {
    return this.comunaService.update(+id, updateComunaDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunaService.remove(+id);
  }

  @Get('ciudad/:id')
    findComunasByCiudad(@Param('id') id: string){
      console.log(id);
    return this.comunaService.findComunasByRegion(+id);
  }

}