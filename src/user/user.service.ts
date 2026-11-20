import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersRepository.save(createUserDto);
  }


  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['clinica'] });
  }

  // findPacienteByRut(rut){
  //   return this.usersRepository.findOne(
  //     {
  //       where:{
  //         rut_persona_fk : rut,

  //       }
  //     }
  //     );
  // }

  findOne(id: number) {
    return this.usersRepository.findOne(
      {
        where: {
          id
        },
        relations: ['clinica']
      }
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
      return this.usersRepository.save(updateUserDto);
    }


  remove(id: number) {
      return this.usersRepository.delete({ id });
    }

  // findPacientes(){

  //  return  this.usersRepository.find({
  //     relations:['persona'],
  //     where:{
  //       id_perfil_fk: 2
  //     }
  //   })
  // }


  findUserByEmail(email){
    return this.usersRepository.findOne({where:{
      email: email
    }})
  }
}