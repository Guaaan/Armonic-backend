import { Comuna } from "src/comuna/entities/comuna.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;


    @OneToMany(() => Persona, (persona) => persona.region)
    persona: Persona[]; 

    @OneToMany(() => Comuna, (comuna) => comuna.region,{cascade:true})
    comunas: Comuna[];
}
