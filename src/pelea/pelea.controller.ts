// peleas.controller.ts
import { Controller, Post, Param, NotFoundException } from '@nestjs/common';
import { Pelea } from './pelea.entity';
import { PeleaService } from './pelea.service';

@Controller('peleas')
export class PeleasController {
  constructor(private readonly peleasService: PeleaService) {}

  @Post(':id/iniciar')
  async iniciarPelea(@Param('id') id: number): Promise<void> {
    try {
      await this.peleasService.iniciarPelea(id);
    } catch (error) {
      throw new NotFoundException(`Error al iniciar pelea: ${error.message}`);
    }
  }
}

