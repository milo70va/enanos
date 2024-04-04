import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './usuarios/usuarios.entity';
import { Enano } from './enanos/enanos.entity';
import { join } from 'path';
import { ApiService } from './api/api.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost', // Definir un valor por defecto si la variable de entorno no está configurada
        port: parseInt(process.env.DB_PORT, 10), // Puerto por defecto para PostgreSQL
        username: process.env.DB_USERNAME || 'usuario', // Usuario por defecto
        password: process.env.DB_PASSWORD || 'contraseña', // Contraseña por defecto
        database: process.env.DB_NAME || 'nombre_bd', // Nombre de la base de datos por defecto
        entities: [Usuario, Enano],
        synchronize: true, // Sincronización automática de la base de datos (cuidado en producción)
      }),
    }),
    TypeOrmModule.forFeature([Usuario, Enano])
  ],
  controllers: [AppController],
  providers: [ApiService],
})
export class AppModule {}


