import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoDocumentoDto } from './dto/create-tipo_documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo_documento.dto';
import { TipoDocumento } from './entities/tipo_documento.entity';

@Injectable()
export class TipoDocumentoService {

  constructor(
     @InjectRepository(TipoDocumento)
     private tipoDocumentoRepository: Repository<TipoDocumento>,  
  ) { }

  create(createTipoDocumentoDto: CreateTipoDocumentoDto): Promise<CreateTipoDocumentoDto> {
    return this.tipoDocumentoRepository.save(createTipoDocumentoDto);
  }

  findAll(): Promise<TipoDocumento[]> {
    return this.tipoDocumentoRepository.find({ relations: ['templateDocumentos'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoDocumento`;
  }

  update(id: number, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    return `This action updates a #${id} tipoDocumento`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoDocumento`;
  }
}
