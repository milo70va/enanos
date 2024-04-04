import { IsString, IsNumber, IsArray, IsInt, Min, Max, ArrayMinSize } from 'class-validator';

export class CreateEnanoDto {
  @IsString()
  imagen: string;

  @IsString()
  sonido: string;

  @IsString()
  nombre: string;

  @IsString()
  biografia: string;

  @IsString()
  frase: string;

  @IsString()
  origen: string;

  @IsString()
  raza: string;

  @IsInt()
  @Min(0)
  victorias: number;

  @IsInt()
  @Min(0)
  derrotas: number;

  @IsNumber()
  @Min(0)
  ratio: number;

  @IsArray()
  @ArrayMinSize(1)
  habilidades: string[];

  @IsInt()
  @Min(0)
  salud: number;

  @IsInt()
  @Min(0)
  estamina: number;

  @IsInt()
  @Min(0)
  fuerza: number;

  @IsInt()
  @Min(0)
  resistencia: number;

  @IsInt()
  @Min(0)
  agilidad: number;

  @IsInt()
  @Min(0)
  inteligencia: number;
}
