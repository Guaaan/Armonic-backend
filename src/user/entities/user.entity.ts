import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, PersistedEntityNotFoundError, BeforeUpdate, BeforeInsert } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
//import * as bcrypt from 'bcrypt';
import { Clinica } from '../../clinica/entities/clinica.entity';
import * as bcrypt from 'bcrypt';

@Entity({name:'usuarios_clinica'})
export class User {

@PrimaryGeneratedColumn()
id: number;

@Column({ nullable: true })
email: string;

@Column({ type: 'varchar', length: 70, nullable: true })
password: string; 

@CreateDateColumn({type: "timestamp"})
fechaCreacion: Date;

@Column()
activo: number;

@UpdateDateColumn ({type: "timestamp"})
fechaUltimoAcceso: Date;

@Column({nullable:true})
uuid: string; 

@Column({nullable:true})
primerIngreso: number;

@Column({nullable:true})
rutPasaporteFk: string;

@ManyToOne(() => Persona, (persona) => persona.user, { cascade: ['update'] })
@JoinColumn({ name: 'rutPasaporteFk' })
persona: Persona;

@Column()
idClinicaFk: number;

@ManyToOne(() => Clinica, clinica => clinica.users)
@JoinColumn({ name: 'idClinicaFk' })
clinica: Clinica;



@BeforeInsert()
async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
}
@BeforeUpdate()
    async updatePassword(){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
}

async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
}

constructor(userId: number, email: string, pass: string) {
    this.id = userId;
    this.email = email;
    this.password = pass;
}

}
