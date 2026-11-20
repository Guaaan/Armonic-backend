import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'nacionalidad' })
export class Nacionalidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Persona, (persona) => persona.nacionalidad)
    persona: Persona[];
}
