// pelea.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pelea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enano1Id: number;

  @Column()
  enano2Id: number;

  @Column({ nullable: true })
  resultado: string; // Podría ser un enum o cualquier tipo según tus necesidades
}
