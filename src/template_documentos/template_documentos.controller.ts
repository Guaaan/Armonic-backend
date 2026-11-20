import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TemplateDocumentosService } from './template_documentos.service';
import { CreateTemplateDocumentoDto } from './dto/create-template_documento.dto';
import { UpdateTemplateDocumentoDto } from './dto/update-template_documento.dto';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@Controller('template-documentos')
export class TemplateDocumentosController {
  constructor(private readonly templateDocumentosService: TemplateDocumentosService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTemplateDocumentoDto: CreateTemplateDocumentoDto) {
    return this.templateDocumentosService.create(createTemplateDocumentoDto);
  }

  @Get()
  findAll() {
    return this.templateDocumentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateDocumentosService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTemplateDocumentoDto: UpdateTemplateDocumentoDto) {
    return this.templateDocumentosService.update(+id, updateTemplateDocumentoDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateDocumentosService.remove(+id);
  }

 // @UseGuards(JwtAuthGuard)
  @Get('by-tipo-documento/:tipoDocumento')
  findByTipoDocumento(@Param('tipoDocumento') tipoDocumento: string) {
    return this.templateDocumentosService.findByTipoDocumentoExact(+tipoDocumento);
  }
}
