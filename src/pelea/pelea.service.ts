// pelea.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelea } from './pelea.entity';
import { Enano } from 'src/enanos/enanos.entity';
import { EnanosService } from 'src/enanos/enanos.service';


@Injectable()
export class PeleaService {
  constructor(
    @InjectRepository(Pelea)
    private peleaRepository: Repository<Pelea>,
    private enanosService: EnanosService, // Inyecta el servicio de Enanos
  ) {}

  async iniciarPelea(idPelea: number): Promise<void> {
    const pelea = await this.buscarPeleaPorId(idPelea);
    if (!pelea) {
      throw new NotFoundException(`Pelea with id ${idPelea} not found`);
    }

    // Obtiene los enanos que participan en la pelea
    const enano1 = await this.enanosService.findOne(pelea.enano1Id);
    const enano2 = await this.enanosService.findOne(pelea.enano2Id);

    // Lógica de combate por turnos
    while (enano1.salud > 0 && enano2.salud > 0) {
      // Simular turno: Aquí puedes implementar la lógica de cada turno de combate
      // Por ejemplo, reducir la vida de los enanos, calcular el daño, etc.
      enano2.salud -= this.calcularDanio(enano1, enano2);
      if (enano2.salud <= 0) {
        // Enano 1 ganó
        break;
      }

      enano1.salud -= this.calcularDanio(enano2, enano1);
      if (enano1.salud <= 0) {
        // Enano 2 ganó
        break;
      }
    }

    // Actualiza los enanos en la base de datos
    await this.enanosService.update(enano1.id, enano1);
    await this.enanosService.update(enano2.id, enano2);

    // Puedes guardar el estado de la pelea, el ganador, etc., en la base de datos si es necesario
  }



  private calcularDanio(atacante: Enano, defensor: Enano): number {
    // Reducción de estamina
    atacante.estamina -= 10;
    if (atacante.estamina < 0) {
        atacante.estamina += 20; // Recuperación de estamina
        console.log('El enano '+ atacante.nombre +' no puede atacar este turno');
        return 0; // El atacante no puede atacar este turno
    }

    // Probabilidad de acertar el golpe
    const probabilidadAcertar = Math.random() * 100;
    if (probabilidadAcertar > atacante.agilidad) {
        console.log('El enano '+ atacante.nombre +' falla el ataque');
        return 0; // El ataque falla
    }

    // Probabilidad de daño crítico
    let multiplicadorDanio = 1;
    const probabilidadCritico = Math.random() * 100;
    if (probabilidadCritico <= atacante.inteligencia) {
      multiplicadorDanio = 1.5;
        console.log('¡Golpe crítico por parte de '+ atacante.nombre +'!');
    }
  
    // Cálculo del daño
    let danio = atacante.fuerza * multiplicadorDanio;
    // Reducción de daño según resistencia del defensor
    danio -= danio * (defensor.resistencia / 100);
  
    if (danio <= 0) {
      return 0; // El defensor bloquea todo el daño
    }
    console.log('El enano '+ atacante.nombre +' inflige '+ danio +' de daño a '+ defensor.nombre);
    defensor.salud -= danio; // Reducción de salud del defensor
    return danio;
  }
  


  async buscarPeleaPorId(id: number): Promise<Pelea> {
    const pelea = await this.peleaRepository.findOne({ where: { id } });
    if (!pelea) {
      throw new NotFoundException(`Pelea with id ${id} not found`);
    }
    return pelea;
  }

  async actualizarResultadoPelea(id: number, resultado: string): Promise<Pelea> {
    const pelea = await this.buscarPeleaPorId(id);
    pelea.resultado = resultado;
    return await this.peleaRepository.save(pelea);
  }
}
