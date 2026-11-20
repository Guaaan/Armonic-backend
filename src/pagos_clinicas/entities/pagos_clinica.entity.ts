import { Clinica } from "src/clinica/entities/clinica.entity";
import { TipoDocumento } from "src/tipo_documento/entities/tipo_documento.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

@Entity('pagos_clinicas') 
export class PagosClinica {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    baseDocumento: string;

    @CreateDateColumn({ type: "timestamp" })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: "timestamp" })
    fechaActualizacion: Date;

    @Column({ nullable: true })
    idClinicaFk: number;

    @ManyToOne(() => Clinica, (clinica) => clinica.pagosClinicas)
    @JoinColumn({ name: 'idClinicaFk' })
    clinica: Clinica;

    @Column({ nullable: true })
    idTipoDocumentoFk: number;

    @ManyToOne(()=> TipoDocumento, (tipoDocumento) => tipoDocumento.pagosClinicas)
    @JoinColumn({ name: 'idTipoDocumentoFk' })
    tipoDocumento: TipoDocumento;
}
