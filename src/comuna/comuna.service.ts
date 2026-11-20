import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { Comuna } from './entities/comuna.entity';

@Injectable()
export class ComunaService {

  constructor(
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>,
  ) { }

  create(createComunaDto: CreateComunaDto): Promise<CreateComunaDto> {
    return this.comunaRepository.save(createComunaDto);
  }

  findAll(): Promise<Comuna[]> {
    return this.comunaRepository.find({ relations: ['region'] });
  }

  findOne(id: number) {
    return this.comunaRepository.findOne(
      {
        where: {
          id
          },
          relations: ['region']
          });
  }

  update(id: number, updateComunaDto: UpdateComunaDto) {
    return this.comunaRepository.save(updateComunaDto);
  }

  remove(id: number) {
    return this.comunaRepository.delete({ id });
  }

  findComunasByRegion(id: number) {
    return this.comunaRepository.find(
      {
        where: {
          idRegionFk: id
        },
        relations: ['region']
      }
    );
  }
}
