import { ApiProperty } from "@nestjs/swagger";
import { Persona } from "src/persona/entities/persona.entity";
import { User } from "../entities/user.entity";

export class CreateUserDto  extends User{

readonly password: string; 

readonly activo: number;

readonly email: string;

readonly uuid: string;

readonly primerIngreso: number;

readonly permisoMensajePush:number;

@ApiProperty({type: 'number'})
readonly persona: Persona




}

// export default CreateUserDto;