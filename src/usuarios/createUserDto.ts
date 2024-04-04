import { IsString, IsNotEmpty, MinLength } from 'class-validator';


//Crear clase con validadores
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    nombreUsuario: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    contraseña: string;
}