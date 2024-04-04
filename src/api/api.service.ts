// api.service.ts
import { Injectable } from '@nestjs/common';
import * as https from 'https'; // Importar el módulo de esta manera
import axios from 'axios';

@Injectable()
export class ApiService {
  constructor() {
    // Configurar el agente HTTPS personalizado
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Esto deshabilita la verificación de certificados (solo para pruebas)
      // Otros parámetros SSL/TLS como `minVersion`, `maxVersion`, etc.
    });

    // Configurar el agente HTTPS en Axios
    axios.defaults.httpsAgent = httpsAgent;
  }

  async fetchDataFromApi(): Promise<any> {
    const apiUrl = 'http://localhost:' + process.env.APP_PORT + '/api';
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  }
}

