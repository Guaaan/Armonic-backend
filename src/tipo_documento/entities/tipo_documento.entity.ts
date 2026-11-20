import { TemplateDocumento } from "src/template_documentos/entities/template_documento.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PagosClinica } from '../../pagos_clinicas/entities/pagos_clinica.entity';

@Entity({ name: 'tipo_documento' })
export class TipoDocumento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    nombre: string;
    
    @Column({ nullable: true })
    descripcion: string;

    
    @Column({ nullable: true })
    urlImage: string;

    @OneToMany(() => TemplateDocumento, (templateDocumento) => templateDocumento.tipoDocumento)
    templateDocumentos: TemplateDocumento[];

    @OneToMany(()=> PagosClinica , (pagosClinica) => pagosClinica.tipoDocumento)
    pagosClinicas: PagosClinica[];

    

}
