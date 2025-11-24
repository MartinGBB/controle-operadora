import { Injectable, Logger } from '@nestjs/common';
import { ICacheRepository } from 'src/domain/repositories/ICacheRepository.repository';
import { DATA_SOURCE } from 'src/infra/config/memory-db.provider';
import { Dependencies } from '@nestjs/common';
import { PagamentoAssinatura } from 'src/infra/database/entities/Pagamento.entity';

@Injectable()
@Dependencies(DATA_SOURCE)
export class CacheMemoryRepository implements ICacheRepository {
  constructor(
    private readonly db: Map<number, PagamentoAssinatura>,
  ) {}

  private readonly logger = new Logger(CacheMemoryRepository.name);

  async atualizarAssinaturaCache(pagamento: PagamentoAssinatura): Promise<void> {
    this.db.set(pagamento.codAssinatura, pagamento);
    this.logger.log(`✅ Cache Atualizado: ID ${pagamento.codAssinatura}`);
  }

  async buscarAssinaturaCache(codAssinatura: number): Promise<PagamentoAssinatura | undefined> {
    const assinatura = this.db.get(codAssinatura);
    return assinatura;
  }
}
