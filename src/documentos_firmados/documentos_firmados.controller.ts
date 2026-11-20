import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { DocumentosFirmadosService } from './documentos_firmados.service';
import { CreateDocumentosFirmadoDto } from './dto/create-documentos_firmado.dto';
import { UpdateDocumentosFirmadoDto } from './dto/update-documentos_firmado.dto';

@Controller('documentos-firmados')
export class DocumentosFirmadosController {
  constructor(private readonly documentosFirmadosService: DocumentosFirmadosService) {}

  @Post()
  create(@Body() createDocumentosFirmadoDto: CreateDocumentosFirmadoDto) {
    return this.documentosFirmadosService.create(createDocumentosFirmadoDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.documentosFirmadosService.findAll(page, limit, search, startDate, endDate);
  }

  @Get('existe')
  existe(
    @Query('rutPersonaFk') rutPersonaFk: string,
    @Query('idTemplateDocumentoFk') idTemplateDocumentoFk: string
  ) {
    return this.documentosFirmadosService.existe(
      +rutPersonaFk,
      +idTemplateDocumentoFk
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosFirmadosService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDocumentosFirmadoDto: UpdateDocumentosFirmadoDto) {
    return this.documentosFirmadosService.update(+id, updateDocumentosFirmadoDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosFirmadosService.remove(+id);
  }
}
