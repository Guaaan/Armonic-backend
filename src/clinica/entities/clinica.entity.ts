import { Paciente } from "src/paciente/entities/paciente.entity";
import { PagosClinica } from "src/pagos_clinicas/entities/pagos_clinica.entity";
import { TemplateDocumento } from "src/template_documentos/entities/template_documento.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as request from 'supertest';

@Entity('clinicas')
export class Clinica {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    nombre: string;

    @Column({ nullable: true })
    correo: string;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    urlPaginaWeb: string;
    
    @Column({ nullable: true })
    urlLogo: string;

    @Column({ nullable: true })
    redSocial: string;

    @Column({ nullable: true })
    rut:number;

    @Column({ nullable: true })
    dv: string;

    @Column({ nullable: true })
    nombreContacto: string;

    @Column({ nullable: true })
    correoContacto: string;

    @CreateDateColumn({ type: "timestamp" })
    fechaCreacion: Date;

    @Column({ nullable: true })
    activo: string;

    @Column({ nullable: true })
    ValorServicioMensualBase: number;


    @OneToMany(() => User, (user) => user.clinica)
    users: User [];

    @OneToMany(() => Paciente, (paciente) => paciente.clinica)
    pacientes: Paciente [];

    @OneToMany(() => TemplateDocumento, (templateDocumento) => templateDocumento.clinica)
    templateDocumentos: TemplateDocumento[];

    @OneToMany(() => PagosClinica, (pagoClinica) => pagoClinica.clinica)
    pagosClinicas: PagosClinica;
}
