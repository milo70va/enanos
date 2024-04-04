import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { MiddlewareConsumer } from '@nestjs/common';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [TypeOrmModule.forFeature([Usuario])], 
})
export class UsuariosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(/* Tus middlewares aquí */)
      .forRoutes('usuarios'); // Prefijo de ruta para todas las rutas del controlador
  }
}
