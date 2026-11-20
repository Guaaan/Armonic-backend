import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagosClinicaDto } from './dto/create-pagos_clinica.dto';
import { UpdatePagosClinicaDto } from './dto/update-pagos_clinica.dto';
import { PagosClinica } from './entities/pagos_clinica.entity';

@Injectable()
export class PagosClinicasService {

  constructor(
    @InjectRepository(PagosClinica)
    private readonly pagosClinicasRepository: Repository<PagosClinica>,
  ) {}

  create(createPagosClinicaDto: CreatePagosClinicaDto): Promise<PagosClinica> {
    return this.pagosClinicasRepository.save(createPagosClinicaDto);
  }

  findAll(): Promise<PagosClinica[]> {
    return this.pagosClinicasRepository.find({relations: ['clinica']});
  }

  findOne(id: number) {
    return this.pagosClinicasRepository.findOne(
      {
        where: {
          id
          },
          relations: ['clinica']
          });
  }

  update(id: number, updatePagosClinicaDto: UpdatePagosClinicaDto) {
    return this.pagosClinicasRepository.save(updatePagosClinicaDto);
  }

  remove(id: number) {
    return this.pagosClinicasRepository.delete({id});
  }
}
