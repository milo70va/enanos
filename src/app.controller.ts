import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api/api.service';

@Controller('api') // Ruta base para este controlador
export class AppController {
  constructor(private readonly apiService: ApiService) {}

  @Get('data') // Ruta relativa a la ruta base del controlador (/api/data)
  async fetchData(): Promise<any> {
    return this.apiService.fetchDataFromApi();
  }
}

