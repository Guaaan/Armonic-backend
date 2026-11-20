import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteService {

  constructor(
    @InjectRepository(Paciente)
    private pacientesRepository: Repository<Paciente>
  ) { }

  create(createPacienteDto: CreatePacienteDto): Promise<CreatePacienteDto> {
    return this.pacientesRepository.save(createPacienteDto);
  }
  findAll(): Promise<Paciente[]> {
    return this.pacientesRepository.find({ relations: ['persona'] });
  }

  findOne(id: number) {
    return this.pacientesRepository.findOne(
      {
        where: {
          id
        },
        relations: ['persona']
      });
  }
  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesRepository.save(updatePacienteDto);
  }

  remove(id: number) {
    return this.pacientesRepository.delete({ id });
  }

}
