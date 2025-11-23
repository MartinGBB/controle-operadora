import { Provider } from '@nestjs/common';
import { AssinaturaCache } from '../../domain/entities/assinatura-cache.model';

// Simula uma string de conexão
export const DATA_SOURCE = 'MEMORY_DB_CONNECTION';

// Simula o Banco de Dados
export const memoryDbProvider: Provider = {
  provide: DATA_SOURCE,
  useFactory: () => {
    // instância única (Singleton) do Map
    return new Map<number, AssinaturaCache>();
  },
};