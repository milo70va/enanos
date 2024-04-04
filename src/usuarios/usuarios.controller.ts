import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { Usuario } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';
import { CreateUserDto } from './createUserDto';

@Controller('usuarios') // Prefijo de ruta para todas las rutas definidas en este controlador
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}


  
  @Post()
  async create(@Body() createUserDto: CreateUserDto){
    console.log('Datos recibidos:', createUserDto);
    return this.usuariosService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    const usuario = await this.usuariosService.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario with id ${id} not found`);
    }
    return usuario;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: CreateUserDto): Promise<Usuario> {
    return this.usuariosService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.usuariosService.remove(id);
  }
}
