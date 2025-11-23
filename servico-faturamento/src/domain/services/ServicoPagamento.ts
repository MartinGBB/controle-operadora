import { IRegistrarPagamentoRepository } from '../repositories/IRegistrarPagamentoRepository';
import { Dependencies, Inject, Injectable } from '@nestjs/common';
import { PagamentoVO } from '../vo/PagamentoVO';
import { PagamentoModel } from '../entities/Pagamento.model';
import { RegraNegocioError } from '../errors/regra-negocio.error';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ServicoPagamento {
  constructor(
    private registrarPagamentoRepository: IRegistrarPagamentoRepository, 
    @Inject('GESTAO_SERVICE') private readonly brokerService: ClientProxy,
    @Inject('PLANOS_ATIVOS_SERVICE') private readonly brokerServicePlanosAtivos: ClientProxy
  ) {}

  async registrarPagamento(pagamento: PagamentoVO): Promise<void> {
    
    if (pagamento.dia < 0 || pagamento.dia > 31) throw new RegraNegocioError('Dia inválido');
    if (pagamento.mes < 0 || pagamento.mes > 12) throw new RegraNegocioError('Mês inválido');
    if (pagamento.mes === 2 && pagamento.dia > 28) throw new RegraNegocioError('Dia inválido');
    if (pagamento.ano < 2000) throw new RegraNegocioError('Ano inválido');
    if (pagamento.codAssinatura < 0) throw new RegraNegocioError('Código da assinatura inválido');
    if (pagamento.valorPago < 0) throw new RegraNegocioError('Valor do pagamento inválido');
    
    const dataPagamento = new Date(pagamento.ano, pagamento.mes - 1, pagamento.dia);

    const pagamentoModel = new PagamentoModel(
      dataPagamento,
      pagamento.codAssinatura,
      pagamento.valorPago,
    );

    await this.registrarPagamentoRepository.registrarPagamento(pagamentoModel);

    // Emite para Gestão
    this.brokerService.emit('PagamentoPlanoServicoGestao', pagamentoModel);
    // Emite para Planos Ativos
    this.brokerServicePlanosAtivos.emit('PagamentoPlanoServicoPlanosAtivos', pagamentoModel);
    return;
  }
}