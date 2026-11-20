import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Like, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';


@Injectable()
export class PersonaService {

  constructor(
    @InjectRepository(Persona)
    private personasRepository: Repository<Persona>
  ) { }

  async create(createPersonaDto: CreatePersonaDto): Promise<CreatePersonaDto> {
    return new Promise(async (resolve, reject) => {

      let isPasaporte = false;
      if(createPersonaDto.pasaporte){
        isPasaporte = true
      }

    let findPersona = null

      if(!isPasaporte){
         findPersona = await this.personasRepository.findOne({
          where: {
            rutPasaporte: createPersonaDto.rutPasaporte
          }
        })
      }else{
        findPersona = await this.personasRepository.findOne({
          where: {
            pasaporte: createPersonaDto.pasaporte
          }
        })
      }
      
      if (findPersona) {
        reject("Persona ya existe");
      }

      if(isPasaporte){
        createPersonaDto.rutPasaporte = Persona.generateUniqueNumberFromPasaporte( createPersonaDto.pasaporte);
        createPersonaDto.pasaporte = createPersonaDto.pasaporte;
      }

   

   

      resolve(await this.personasRepository.save(createPersonaDto))


    })



  }

  findAll(): Promise<Persona[]> {
    return this.personasRepository.find();
  }

  async findOne(identifier: any) {
    let persona: Persona | undefined;
    let tipoIdentificador: 'numero' | 'cadena';

    // Verificar si identifier es un número (usando una función auxiliar)
    if (this.isNumber(identifier)) {
      persona = await this.personasRepository.findOne({ where: { rutPasaporte: identifier } });
      tipoIdentificador = 'numero'; // Asignar tipo de identificador como número
    } else {
      // Si no es un número, asumimos que es una cadena
      persona = await this.personasRepository.findOne({ where: { pasaporte: Like(`%${identifier}%`) } });
      tipoIdentificador = 'cadena'; // Asignar tipo de identificador como cadena
    }


   return persona;  
  
  }

  update(rutPasaporte: number, updatePersonaDto: UpdatePersonaDto) {
    return this.personasRepository.save(updatePersonaDto);
  }

  remove(rutPasaporte: number) {
    return this.personasRepository.delete({ rutPasaporte });
  }

  private isNumber(value: any): boolean {
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
  }
}
