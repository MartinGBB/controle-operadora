import { PagamentoAssinaturaVO } from '../vo/PagamentoAssinatura';
import { ICacheRepository } from '../repositories/ICacheRepository.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Dependencies } from '@nestjs/common';

@Injectable()
@Dependencies(ICacheRepository)
export class ConsultarStatusService {
  private readonly logger = new Logger(ConsultarStatusService.name);
  constructor(private readonly cacheRepo: ICacheRepository) {}

  async consultarStatusAssinatura(codAssinatura: number): Promise<boolean> {
    const assinatura = await this.cacheRepo.buscarAssinaturaCache(codAssinatura);
    
    if (!assinatura) {
      this.logger.log(`Assinatura não encontrada - CodAss: ${codAssinatura}`);
      return false;
    } else {
      this.logger.log(`Assinatura encontrada: ${JSON.stringify(assinatura)}`);
    }

    const assinaturaConvert = new PagamentoAssinaturaVO(
      assinatura.codAssinatura,
      assinatura.dataPagamento,
      assinatura.valorPago,
    );

    return assinaturaConvert.estaAtiva();
  }
}
