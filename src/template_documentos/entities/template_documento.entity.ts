import { DocumentosFirmado } from "src/documentos_firmados/entities/documentos_firmado.entity";
import { TipoDocumento } from "src/tipo_documento/entities/tipo_documento.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Clinica } from '../../clinica/entities/clinica.entity';
import { Procedimiento } from "src/procedimiento/entities/procedimiento.entity";

@Entity({ name: 'template_documentos' })
export class TemplateDocumento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre:string;
    @Column({ nullable: true, type:'json'})
    baseDocumento: object;

    @CreateDateColumn({ type: "timestamp" })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: "timestamp" })
    fechaActualizacion: Date;
    

    @Column()
    idClinicaFk: number;

    @Column()
    subTipo: string;

    @Column()
    urlImage: string;

    @ManyToOne(() => Clinica, (clinica) => clinica.templateDocumentos)
    @JoinColumn({ name: 'idClinicaFk' })
    clinica: Clinica;

    @Column()
    idTipoDocumentoFk: number;

    @ManyToOne(()=> TipoDocumento, (tipoDocumento) => tipoDocumento.templateDocumentos)
    @JoinColumn({ name: 'idTipoDocumentoFk' })
    tipoDocumento: TipoDocumento;

    @OneToMany(() => DocumentosFirmado, (documentosFirmado) => documentosFirmado.templateDocumento)
    documentosFirmados: DocumentosFirmado[];


    @ManyToMany(() => Procedimiento,(procedimientos) => procedimientos.templateDocumentos)
    @JoinTable()
    procedimientos:Procedimiento[]

    @Column({ nullable: true, type:'json'})
    templatePdfmake: object;
}
