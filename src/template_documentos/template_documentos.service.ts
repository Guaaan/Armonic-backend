import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateDocumentoDto } from './dto/create-template_documento.dto';
import { UpdateTemplateDocumentoDto } from './dto/update-template_documento.dto';
import { TemplateDocumento } from './entities/template_documento.entity';

@Injectable()
export class TemplateDocumentosService {

  constructor(
     @InjectRepository(TemplateDocumento)
     private templateDocumentosRepository: Repository<TemplateDocumento>,
  ) { }

  create(createTemplateDocumentoDto: CreateTemplateDocumentoDto): Promise<CreateTemplateDocumentoDto> {
    return this.templateDocumentosRepository.save(createTemplateDocumentoDto);
  }

  findAll(): Promise<TemplateDocumento[]> {
    return this.templateDocumentosRepository.find({relations: ['tipoDocumento','procedimientos']});
  }

  findOne(id: number) {
    return this.templateDocumentosRepository.findOne(
      {
        where: {
          id
        },
        relations: ['tipoDocumento']
      });
  }

  update(id: number, updateTemplateDocumentoDto: UpdateTemplateDocumentoDto) {
    return this.templateDocumentosRepository.save(updateTemplateDocumentoDto);
  }

  remove(id: number) {
    return this.templateDocumentosRepository.delete({ id });
  }
  findByTipoDocumentoExact(tipoDocumento: number): Promise<TemplateDocumento[]> {
    return this.templateDocumentosRepository.find({
      where: { tipoDocumento: {id:tipoDocumento} },
      relations: ['tipoDocumento', 'procedimientos']
    });
  }
}
