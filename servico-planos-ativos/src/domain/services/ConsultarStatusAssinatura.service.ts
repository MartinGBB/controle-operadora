import { Injectable } from '@nestjs/common';
import { ICacheRepository } from '../../domain/repositories/ICache.repository';

@Injectable()
export class ConsultarStatusService {
  constructor(private readonly cacheRepo: ICacheRepository) {}
  async consultarStatusAssinatura(codAssinatura: number): Promise<boolean> {
    const assinatura = await this.cacheRepo.verificarSeAssinaturaEstaAtiva(codAssinatura);

    if (!assinatura) return false; // Não existe no cache = Inativo

    return assinatura;
  }
}
