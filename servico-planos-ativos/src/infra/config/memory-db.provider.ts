import { Provider } from '@nestjs/common';
import { PagamentoAssinatura } from '../database/entities/Pagamento.entity';

// Simula uma string de conexão
export const DATA_SOURCE = 'MEMORY_DB_CONNECTION';

// Simula o Banco de Dados
export const memoryDbProvider: Provider = {
  provide: DATA_SOURCE,
  useFactory: () => {
    // instância única (Singleton) do Map
    return new Map<number, PagamentoAssinatura>();
  },
};
