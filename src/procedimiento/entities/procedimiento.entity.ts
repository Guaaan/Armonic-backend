import { DocumentosFirmado } from "src/documentos_firmados/entities/documentos_firmado.entity";
import { TemplateDocumento } from "src/template_documentos/entities/template_documento.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { TemplateAnexo } from '../../template_anexos/entities/template_anexo.entity';

@Entity({ name: 'procedimientos' })    
export class Procedimiento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    nombre: string;

    @Column({ nullable: true })
    descripcion: string;

    @CreateDateColumn({ type: "timestamp" })
    fechaCreacion: Date;



    @ManyToMany(() => TemplateDocumento,(templateDocumento) => templateDocumento.procedimientos)
    templateDocumentos:TemplateDocumento[]
    

}
