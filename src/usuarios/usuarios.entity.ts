// usuario.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Enano } from '../enanos/enanos.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreUsuario: string;

    @Column()
    contraseña: string;

    @OneToMany(() => Enano, enano => enano.usuario)
    enanos: Enano[];

    @BeforeInsert()
    async hashPassword() {
        this.contraseña = await bcrypt.hash(this.contraseña, 10);
    }
}


