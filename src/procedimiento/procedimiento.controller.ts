import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { CreateProcedimientoDto } from './dto/create-procedimiento.dto';
import { UpdateProcedimientoDto } from './dto/update-procedimiento.dto';
import { ProcedimientoService } from './procedimiento.service';

@Controller('procedimiento')
export class ProcedimientoController {
  constructor(private readonly procedimientoService: ProcedimientoService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProcedimientoDto: CreateProcedimientoDto) {
    return this.procedimientoService.create(createProcedimientoDto);
  }

  @Get()
  findAll() {
    return this.procedimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedimientoService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProcedimientoDto: UpdateProcedimientoDto) {
    return this.procedimientoService.update(+id, updateProcedimientoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedimientoService.remove(+id);
  }
}
