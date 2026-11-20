import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ConflictException, UseGuards } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { JwtAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {

    try {
      return await this.personaService.create(createPersonaDto);

    } catch (error) {
      throw new ConflictException(error);

    }
  }

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
