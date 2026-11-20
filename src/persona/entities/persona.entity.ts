// import { Comuna } from "src/comuna/entities/comuna.entity";
// import { Medico } from "src/medico/entities/medico.entity";
// import { Nacionalidad } from "src/nacionalidad/entities/nacionalidad.entity";
import { Comuna } from "src/comuna/entities/comuna.entity";
import { Nacionalidad } from "src/nacionalidad/entities/nacionalidad.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { DocumentosFirmado } from '../../documentos_firmados/entities/documentos_firmado.entity';
import { Region } from "src/region/entities/region.entity";
import { sha256 } from "js-sha256";
import { createHash } from "crypto";


@Entity({ name: 'personas' })
export class Persona {

    @PrimaryColumn()
    rutPasaporte: number;

    @Column({ nullable: true })
    pasaporte: string;  // Nueva columna para almacenar el pasaporte


    @Column()
    dv: string;

    @Column({ nullable: true })
    tipoDocumento: string;

    @Column({ nullable: true })
    nombres: string;

    @Column({ nullable: true })
    segNombre: string;

    @Column({ nullable: true })
    apellidos: string

    @Column({ nullable: true })
    segApellido: string

    @Column({ nullable: true })
    fechaNacimiento: Date;

    @Column({ nullable: true })
    fono: number;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    sexo: string;

    @Column({ nullable: true })
    direccion: string;

    @CreateDateColumn({ type: "timestamp" })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: "timestamp" })
    fechaActualizacion: Date;

    @Column({ nullable: true })
    representanteLegal: String;

    @Column({ nullable: true })
    rutRepresentante: String;

    @Column({ nullable: true })
    idNacionalidadFk: number;

    @ManyToOne(() => Nacionalidad, (nacionalidad) => nacionalidad.persona)
    @JoinColumn({ name: 'idNacionalidadFk'})
    nacionalidad: Nacionalidad;

    @Column({ nullable: true })
    idRegionFk: number;

    @ManyToOne(() => Region, (region) => region.persona)
    @JoinColumn({ name: 'idRegionFk' })
    region: Region;

    @Column({ nullable: true })
    idComunaFk: number;

    @ManyToOne(() => Comuna, (comuna) => comuna.persona)
    @JoinColumn({ name: 'idComunaFk' })
    comuna: Comuna;


    @OneToOne(() => Paciente, (paciente) => paciente.persona)
    paciente: Paciente;

    @OneToMany(() => DocumentosFirmado, (documentosFirmado) => documentosFirmado.persona)
    documentosFirmados: DocumentosFirmado[];

    @OneToMany(() => User, (user) => user.persona)
    user: User[];
  // Método estático para generar rutPasaporte basado en el pasaporte
 
  static generateUniqueNumberFromPasaporte(pasaporte: string): number {
    const hash = createHash('sha256').update(pasaporte).digest('hex'); // Generar hash SHA-256
    const hashInt = BigInt(`0x${hash}`); // Convertir la cadena hexadecimal a BigInt

    // Limitar el número al rango permitido por un INT de 11 dígitos
    const maxAllowedValue = 2147483647; // Máximo valor para un INT de 11 dígitos
    const uniqueNumber = Number(hashInt % BigInt(maxAllowedValue)); // Tomar módulo para limitar al rango

    return uniqueNumber;
}

}

