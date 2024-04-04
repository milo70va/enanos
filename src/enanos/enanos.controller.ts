import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { Enano } from './enanos.entity';
import { EnanosService } from './enanos.service';
import { CreateEnanoDto } from './createEnanoDto';

@Controller('enanos') // Prefijo de ruta para todas las rutas definidas en este controlador
export class EnanosController {
  constructor(private readonly enanosService: EnanosService) {}

  @Post()
  async create(@Body() createEnanoDto: CreateEnanoDto): Promise<Enano> {
    return this.enanosService.create(createEnanoDto);
  }

  @Get()
  async findAll(): Promise<Enano[]> {
    return this.enanosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Enano> {
    const enano = await this.enanosService.findOne(id);
    if (!enano) {
      throw new NotFoundException(`Enano with id ${id} not found`);
    }
    return enano;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEnanoDto: CreateEnanoDto): Promise<Enano> {
    return this.enanosService.update(id, updateEnanoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.enanosService.remove(id);
  }
}
