import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
import { Clinica } from './entities/clinica.entity';

@Injectable()
export class ClinicaService {

  constructor(
    @InjectRepository(Clinica)
    private clinicaRepository: Repository<Clinica>
  ) { }

  create(createClinicaDto: CreateClinicaDto): Promise<CreateClinicaDto> {
    return this.clinicaRepository.save(createClinicaDto);
  }

  findAll(): Promise<Clinica[]> {
    return this.clinicaRepository.find({ relations: ['pacientes'] });
  }

  findOne(id: number) {
    return this.clinicaRepository.findOne(
      {
        where: {
          id
        },
        relations: ['pacientes']
      });
  }

  update(id: number, updateClinicaDto: UpdateClinicaDto) {
    return this.clinicaRepository.save(updateClinicaDto);
  }

  remove(id: number) {
    return this.clinicaRepository.delete({ id });
  }
}
