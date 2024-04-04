import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config(); // Carga las variables de entorno

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Aplicación iniciada en el puerto:', process.env.APP_PORT);

  app.setGlobalPrefix('api'); // Prefijo de ruta global para todas las rutas
  // Configurar ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma automáticamente las solicitudes en DTOs
    whitelist: true, // Elimina propiedades desconocidas de los DTOs
    forbidNonWhitelisted: true, // Rechaza solicitudes con propiedades desconocidas en los DTOs
  }));

  await app.listen(process.env.APP_PORT);
}
bootstrap();

