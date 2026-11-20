import { TemplateDocumento } from 'src/template_documentos/entities/template_documento.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { Procedimiento } from 'src/procedimiento/entities/procedimiento.entity';
import { Clinica } from 'src/clinica/entities/clinica.entity';
import { Anexo } from 'src/anexos/entities/anexo.entity';
@Entity({ name: 'documentos_firmados' })
export class DocumentosFirmado {

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

    @ManyToOne(()=> Persona, (persona) => persona.documentosFirmados)
    @JoinColumn({ name: 'rutPersonaFk' })
    persona: Persona;

    @Column({ nullable: true })
    idTemplateDocumentoFk: number;



    @Column({ nullable: true, type:'json'})
    respuestaDocumento: object;


    @ManyToOne(() => TemplateDocumento, (templateDocumento) => templateDocumento.documentosFirmados)
    @JoinColumn({ name: 'idTemplateDocumentoFk' })
    templateDocumento: TemplateDocumento;



    @OneToMany(() => Anexo, (anexo) => anexo.documentoFirmado)
    anexos: Anexo[];
    
}
