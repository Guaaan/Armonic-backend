import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateAnexoDto } from './dto/create-template_anexo.dto';
import { UpdateTemplateAnexoDto } from './dto/update-template_anexo.dto';
import { TemplateAnexo } from './entities/template_anexo.entity';

@Injectable()
export class TemplateAnexosService {

  constructor(
     @InjectRepository(TemplateAnexo)
     private templateAnexosRepository: Repository<TemplateAnexo>,
  ) { }

  create(createTemplateAnexoDto: CreateTemplateAnexoDto): Promise<CreateTemplateAnexoDto> {
    return this.templateAnexosRepository.save(createTemplateAnexoDto);
  }

  findAll(): Promise<TemplateAnexo[]> {
    return this.templateAnexosRepository.find();
  }

  findOne(id: number) {
    return this.templateAnexosRepository.findOne({ where: { id } });
  }

  update(id: number, updateTemplateAnexoDto: UpdateTemplateAnexoDto) {
    return this.templateAnexosRepository.save(updateTemplateAnexoDto);
  }

  remove(id: number) {
    return this.templateAnexosRepository.delete({ id });
  }
}
