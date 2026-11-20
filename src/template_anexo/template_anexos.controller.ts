import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TemplateAnexosService } from './template_anexos.service';
import { CreateTemplateAnexoDto } from './dto/create-template_anexo.dto';
import { UpdateTemplateAnexoDto } from './dto/update-template_anexo.dto';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@Controller('template-anexos')
export class TemplateAnexosController {
  constructor(private readonly templateAnexosService: TemplateAnexosService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTemplateAnexoDto: CreateTemplateAnexoDto) {
    return this.templateAnexosService.create(createTemplateAnexoDto);
  }

  @Get()
  findAll() {
    return this.templateAnexosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateAnexosService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTemplateAnexoDto: UpdateTemplateAnexoDto) {
    return this.templateAnexosService.update(+id, updateTemplateAnexoDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateAnexosService.remove(+id);
  }
}
