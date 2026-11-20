import { DocumentosFirmado } from 'src/documentos_firmados/entities/documentos_firmado.entity';
import { TemplateAnexo } from 'src/template_anexo/entities/template_anexo.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'anexos' })
export class Anexo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    fechaFirma: Date;

    @Column({ nullable: true }) 
    documento: string;

    @Column({ nullable: true })
    urlPdf: string;

    @Column({ nullable: true })
    rutPersonaFk: number;

   

    @Column({ nullable: true })
    idTemplateAnexoFk: number;

    @ManyToOne(() => TemplateAnexo, (templateAnexo) => templateAnexo.anexos)
    @JoinColumn({ name: 'idTemplateAnexoFk' })
    templateAnexo: TemplateAnexo;

    @Column({ nullable: true })
    documentoFirmadoId:number;
    
    @ManyToOne(() => DocumentosFirmado, (documentosFirmado) => documentosFirmado.anexos)
    documentoFirmado: DocumentosFirmado[];

    @Column({ type: 'json', nullable: true })
    datosFormulario: any; // Almacena los datos del formulario en formato JSON


    

}
