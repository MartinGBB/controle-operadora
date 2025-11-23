import { Injectable, Logger } from '@nestjs/common';
import { PagamentoAssinaturaDTO } from '../vo/PagamentoAssinatura';

@Injectable()
export class GerenciadorCacheService {
  private readonly logger = new Logger(GerenciadorCacheService.name);
  
  // Simulação de Cache em Memória
  private assinaturasAtivas = new Map<number, { dataPagamento: Date, valorPago: number }>();
  private readonly DIAS_VALIDADE = 30;
  
  // 1. Método chamado pelo Evento (RabbitMQ)
  atualizarAssinatura(pagamento: PagamentoAssinaturaDTO) {
    const dataValidade = new Date(pagamento.dataPagamento);
    dataValidade.setDate(dataValidade.getDate() + this.DIAS_VALIDADE);

    this.assinaturasAtivas.set(pagamento.codAssinatura, { dataPagamento: pagamento.dataPagamento, valorPago: pagamento.valorPago });
    
    this.logger.log(`CACHE ATUALIZADO: Assinatura ${pagamento.codAssinatura}, válida até ${dataValidade.toLocaleDateString()}`);
  }

  // 2. Método chamado pelo Gateway
  verificarSeAtiva(codAssinatura: number): boolean {
    const validade: { dataPagamento: Date, valorPago: number } | undefined = this.assinaturasAtivas.get(codAssinatura);
    if (!validade) return false;

    const hoje = new Date();
    return validade.dataPagamento > hoje;
  }
}
