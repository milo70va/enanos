import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { CreateUserDto } from './createUserDto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    console.log('Creando usuario con DTO:', createUserDto);
    const { nombreUsuario, contraseña } = createUserDto;
    const usuario = this.usuarioRepository.create({ nombreUsuario, contraseña });
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario with id ${id} not found`);
    }
    return usuario;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    const { nombreUsuario, contraseña } = updateUserDto;
    usuario.nombreUsuario = nombreUsuario;
    usuario.contraseña = contraseña;
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}
