import { Persona } from "src/persona/entities/persona.entity";
import { Region } from "src/region/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comuna' })
export class Comuna {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @Column({nullable:true})
    idRegionFk: number;
    
    @ManyToOne(() => Region, (region) => region.comunas)
    @JoinColumn({ name: 'idRegionFk' })
    region: Region; 
 
    @OneToMany(() => Persona, (persona) => persona.comuna)
    persona: Persona[];
}
