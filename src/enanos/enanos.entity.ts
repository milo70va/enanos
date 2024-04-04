import { Usuario } from 'src/usuarios/usuarios.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Enano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagen: string;

  @Column()
  sonido: string;

  @Column()
  nombre: string;

  @Column()
  biografia: string;

  @Column()
  frase: string;

  @Column()
  origen: string;

  @Column()
  raza: string;

  @Column()
  victorias: number;

  @Column()
  derrotas: number;

  @Column()
  ratio: number;

  @Column("simple-array")
  habilidades: string[];

  @Column()
  salud: number;

  @Column()
  estamina: number;

  @Column()
  fuerza: number;

  @Column()
  resistencia: number;

  @Column()
  agilidad: number;

  @Column()
  inteligencia: number;

  @Column()
  velocidad: number;

  @ManyToOne(() => Usuario, usuario => usuario.enanos)
  usuario: Usuario;

  constructor(
    imagen: string,
    sonido: string,
    nombre: string,
    biografia: string,
    frase: string,
    origen: string,
    raza: string,
    victorias: number,
    derrotas: number,
    ratio: number,
    habilidades: string[],
    salud: number,
    estamina: number,
    fuerza: number,
    resistencia: number,
    agilidad: number,
    inteligencia: number,
    velocidad: number
  ) {
    this.imagen = imagen;
    this.sonido = sonido;
    this.nombre = nombre;
    this.biografia = biografia;
    this.frase = frase;
    this.origen = origen;
    this.raza = raza;
    this.victorias = victorias;
    this.derrotas = derrotas;
    this.ratio = ratio;
    this.habilidades = habilidades;
    this.salud = salud;
    this.estamina = estamina;
    this.fuerza = fuerza;
    this.resistencia = resistencia;
    this.agilidad = agilidad;
    this.inteligencia = inteligencia;
    this.velocidad = velocidad;
  }
}


  


