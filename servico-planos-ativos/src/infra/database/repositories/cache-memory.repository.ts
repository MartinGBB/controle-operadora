import { Injectable } from '@nestjs/common';
import { PagamentoAssinatura } from '../entities/PagamentoAssinatura.entity';
import { ICacheRepository } from 'src/domain/repositories/ICacheRepository.repository';
import { DATA_SOURCE } from 'src/infra/config/memory-db.provider';
import { Dependencies } from '@nestjs/common';

@Injectable()
@Dependencies(DATA_SOURCE)
export class CacheMemoryRepository implements ICacheRepository {
  constructor(
    private readonly db: Map<number, PagamentoAssinatura>,
  ) {}

  async atualizarAssinaturaCache(pagamento: PagamentoAssinatura): Promise<void> {
    this.db.set(pagamento.codAssinatura, pagamento);
  }

  async buscarAssinaturaCache(codAssinatura: number): Promise<PagamentoAssinatura | undefined> {
    const assinatura = this.db.get(codAssinatura);
    return assinatura;
  }
}
