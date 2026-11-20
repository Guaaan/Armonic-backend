import { Anexo } from 'src/anexos/entities/anexo.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'template_anexos' })
export class TemplateAnexo {

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

    @Column({ nullable: true, type:'json'})
    templatePdfmake: object;
    
    @OneToMany(() => Anexo, (anexo) => anexo.templateAnexo)
    anexos: Anexo[];

}
