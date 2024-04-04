import { Module } from '@nestjs/common';
import { EnanosService } from './enanos.service';
import { EnanosController } from './enanos.controller';
import { MiddlewareConsumer } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EnanosController],
  providers: [EnanosService],
  exports: [EnanosService], // Si necesitas exportar el servicio para otros módulos
})
export class EnanosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('enanos'); // Prefijo de ruta para todas las rutas del controlador
  }
}

