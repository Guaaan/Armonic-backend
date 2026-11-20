import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcedimientoDto } from './dto/create-procedimiento.dto';
import { UpdateProcedimientoDto } from './dto/update-procedimiento.dto';
import { Procedimiento } from './entities/procedimiento.entity';

@Injectable()
export class ProcedimientoService {

  constructor (
     @InjectRepository(Procedimiento)
      private readonly procedimientoRepository: Repository<Procedimiento>,
  ) {}

  create(createProcedimientoDto: CreateProcedimientoDto): Promise<Procedimiento> {
    return this.procedimientoRepository.save(createProcedimientoDto);
  }

  findAll(): Promise<Procedimiento[]> {
    return this.procedimientoRepository.find({relations:['procedimientos']});
  }

  findOne(id: number) {
    return this.procedimientoRepository.findOne(
      {
        where: {
          id
        },

        relations: ['documentosFirmados']
      }
    );
    
  }
  
  update(id: number, updateProcedimientoDto: UpdateProcedimientoDto) {
    return this.procedimientoRepository.save(updateProcedimientoDto);
  }

  remove(id: number) {
    return this.procedimientoRepository.delete({id});
  }
}
