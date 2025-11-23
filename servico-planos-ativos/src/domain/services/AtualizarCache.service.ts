import { Injectable, Logger } from '@nestjs/common';
import { AssinaturaCache } from '../../domain/entities/assinatura-cache.model';
import { PagamentoAssinaturaDTO } from '../../domain/vo/PagamentoAssinatura';
import { ICacheRepository } from '../../domain/repositories/ICache.repository';

@Injectable()
export class AtualizarCacheService {
  private readonly logger = new Logger(AtualizarCacheService.name);
  private readonly DIAS_VALIDADE = 30; // 30 dias

  constructor(private readonly repo: ICacheRepository) {}

  async execute(dto: PagamentoAssinaturaDTO): Promise<void> {
    // Calcular Vencimento
    const dataValidade = new Date(dto.dataPagamento);
    dataValidade.setDate(dataValidade.getDate() + this.DIAS_VALIDADE);

    // Criar Entidade de Domínio
    const assinatura = new AssinaturaCache(
      dto.codAssinatura,
      dto.dataPagamento,
      dto.valorPago
    );

    // Persistir
    await this.repo.atualizarAssinaturaCache(assinatura);
    
    this.logger.log(`✅ Cache Atualizado: ID ${dto.codAssinatura} válida até ${dataValidade.toLocaleDateString()}`);
  }
}
