import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNacionalidadDto } from './dto/create-nacionalidad.dto';
import { UpdateNacionalidadDto } from './dto/update-nacionalidad.dto';
import { Nacionalidad } from './entities/nacionalidad.entity';

@Injectable()
export class NacionalidadService {

  constructor(
    @InjectRepository(Nacionalidad)
    private nacionalidadRepository: Repository<Nacionalidad>,
  ) { }

  create(createNacionalidadDto: CreateNacionalidadDto): Promise<CreateNacionalidadDto> {
    return this.nacionalidadRepository.save(createNacionalidadDto);
  }

  findAll(): Promise<Nacionalidad[]> {
    return this.nacionalidadRepository.find({ relations: ['persona'] });
  }

  findOne(id: number) {
    return this.nacionalidadRepository.findOne(
      {
        where: {
          id
          },
          relations: ['persona']
          });
  }

  update(id: number, updateNacionalidadDto: UpdateNacionalidadDto) {
    return this.nacionalidadRepository.save(updateNacionalidadDto);
  }

  remove(id: number) {
    return this.nacionalidadRepository.delete({ id });
  }
}
