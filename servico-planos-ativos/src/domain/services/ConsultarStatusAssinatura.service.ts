import { AssinaturaCache } from '../entities/assinatura-cache.model';
import { ICacheRepository } from '../repositories/ICacheRepository.repository';
import { Injectable } from '@nestjs/common';
import { Dependencies } from '@nestjs/common';

@Injectable()
@Dependencies(ICacheRepository)
export class ConsultarStatusService {
  constructor(private readonly cacheRepo: ICacheRepository) {}
  async consultarStatusAssinatura(codAssinatura: number): Promise<boolean> {
    const assinatura = await this.cacheRepo.buscarAssinaturaCache(codAssinatura);

    if (!assinatura) return false; // Não existe no cache = Inativo

    const assinaturaConvert = new AssinaturaCache(
      assinatura.codAssinatura,
      assinatura.dataPagamento,
      assinatura.valorPago
    );

    return assinaturaConvert.estaAtiva();
  }
}
