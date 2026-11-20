import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { UpdateAnexoDto } from './dto/update-anexo.dto';
import { Anexo } from './entities/anexo.entity';

@Injectable()
export class AnexosService {

constructor(
  @InjectRepository(Anexo)
  private readonly anexosRepository: Repository<Anexo>,
) {}

  create(createAnexoDto: CreateAnexoDto): Promise<Anexo> {
    return this.anexosRepository.save(createAnexoDto);
  }

  findAll(): Promise<Anexo[]> {
    return this.anexosRepository.find({relations: ['templateAnexo']});
  }

  findOne(id: number) {
    return this.anexosRepository.findOne(
      {
        where: {
          id
          },
          relations: ['templateAnexo']
          });
  }

  /**
   * Obtiene un anexo con todos sus datos incluyendo datosFormulario
   */
  async findOneWithData(id: number): Promise<Anexo> {
    return this.anexosRepository.findOne({
      where: { id },
      relations: ['templateAnexo', 'documentoFirmado']
    });
  }

  update(id: number, updateAnexoDto: UpdateAnexoDto) {
    return this.anexosRepository.update(id, updateAnexoDto);
  }

  /**
   * Actualiza un anexo existente y retorna el anexo actualizado
   */
  async updateAndReturn(id: number, updateAnexoDto: UpdateAnexoDto): Promise<Anexo> {
    await this.anexosRepository.update(id, updateAnexoDto);
    return this.findOneWithData(id);
  }

  remove(id: number) {
    return this.anexosRepository.delete({id});
  }
}
