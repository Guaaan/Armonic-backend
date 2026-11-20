import { Clinica } from "src/clinica/entities/clinica.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pacientes' })
export class Paciente {

    @PrimaryGeneratedColumn({})
    id: number;

    @Column({ nullable: true })
    actividadProfesional: string;

    @CreateDateColumn({ type: 'timestamp' })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    fechaActualizacion: Date;

    @Column({ nullable: true })
    cirugiasPrevias: string;

    @Column({ nullable: true })
    observaciones: string;

    @Column({ nullable: true })
    rutPasaporteFk: number;

    @OneToOne(() => Persona, (persona) => persona.paciente, { cascade: ['update'] })
    @JoinColumn({ name: 'rutPasaporteFk' })
    persona: Persona;

    @Column()
    idClinicaFk: number;
    
    @ManyToOne(() => Clinica, (clinica) => clinica.pacientes, { cascade: ['update'] })
    @JoinColumn({ name: 'idClinicaFk' })
    clinica: Clinica;


}