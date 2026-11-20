import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { AnexosService } from './anexos.service';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { UpdateAnexoDto } from './dto/update-anexo.dto';
@UseGuards(JwtAuthGuard)
@Controller('anexos')
export class AnexosController {
  constructor(private readonly anexosService: AnexosService) {}

  @Post()
  create(@Body() createAnexoDto: CreateAnexoDto) {
    return this.anexosService.create(createAnexoDto);
  }

  @Get()
  findAll() {
    return this.anexosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anexosService.findOne(+id);
  }

  @Get(':id/con-datos')
  findOneWithData(@Param('id') id: string) {
    return this.anexosService.findOneWithData(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAnexoDto: UpdateAnexoDto) {
    return this.anexosService.updateAndReturn(+id, updateAnexoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anexosService.remove(+id);
  }
}
