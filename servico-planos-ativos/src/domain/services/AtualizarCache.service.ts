import { Dependencies, Injectable } from '@nestjs/common';
import { PagamentoAssinaturaModel } from '../../domain/entities/PagamentoAssinatura.model';
import { ICacheRepository } from '../repositories/ICacheRepository.repository';

@Injectable()
@Dependencies(ICacheRepository)
export class AtualizarCacheService {
  constructor(private readonly repo: ICacheRepository) {}

  async atualizaAssinatura(assinatura: PagamentoAssinaturaModel): Promise<void> {
    await this.repo.atualizarAssinaturaCache(assinatura);
  }
}
