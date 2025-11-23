import { Injectable } from '@nestjs/common';
import { AssinaturaModel, THIRTY_DAYS } from '../entities/Assinatura.model';
import {
  AssinaturaTipo,
  IAssinaturaRepository,
} from '../repositories/IAssinaturaRepository';
import { AssinaturaFactory } from '../factories/AssinaturaFactory';
import { CriarAssinaturaVO } from '../vo/CriarAssinaturaVO';
import { RegistroNaoEncontradoError, RegraNegocioError } from '../errors/regra-negocio.error';
import { IClienteRepository } from '../repositories/IClienteRepository';
import { IPlanoRepository } from '../repositories/IPlanoRepository';

@Injectable()
export class ServicoAssinatura {
  constructor(
    private assinaturaRepository: IAssinaturaRepository,
    private clienteRepository: IClienteRepository,
    private planoRepository: IPlanoRepository,
  ) { }

  async criarAssinatura(input: CriarAssinaturaVO): Promise<AssinaturaModel> {
    await this.clienteRepository.buscarPorCodigo(input.codCli);
    await this.planoRepository.buscarPorCodigo(input.codPlano);

    const novaAssinatura = AssinaturaFactory.criar(input);
    const assinatura = await this.assinaturaRepository.criarAssinatura(novaAssinatura);

    if (!assinatura) throw new RegraNegocioError('Erro ao criar assinatura');
    return assinatura;
  }

  async buscaPorTipo(tipo: AssinaturaTipo) {
    const hoje = new Date();
    const trintaDiasAtras = new Date(hoje.getTime() - THIRTY_DAYS); // Regra de 30 dias

    let criterio = {};

    if (tipo === AssinaturaTipo.ATIVO) {
      criterio = {
        dataUltimoPagamento: { operator: 'gte', value: trintaDiasAtras },
      };

    } else if (tipo === AssinaturaTipo.CANCELADO) {
      criterio = {
        dataUltimoPagamento: { operator: 'lt', value: trintaDiasAtras },
      };
    }

    const assinaturas = await this.assinaturaRepository.buscaPorTipo(criterio);

    if (assinaturas.length === 0) {
      throw new RegistroNaoEncontradoError('Nenhuma assinatura encontrada para o tipo');
    }
    return assinaturas;
  }

  async buscarPorCliente(codCli: number): Promise<AssinaturaModel[]> {
    if (!codCli) throw new RegraNegocioError('Código do cliente não informado');
    if (codCli <= 0) throw new RegraNegocioError('Código do cliente deve ser maior que 0');

    const assinaturas = await this.assinaturaRepository.buscarPorCliente(codCli);

    if (assinaturas.length === 0) {
      throw new RegistroNaoEncontradoError('Nenhuma assinatura encontrada para o cliente');
    }
    return assinaturas;
  }

  async buscarPorPlano(codPlano: number): Promise<AssinaturaModel[]> {
    if (!codPlano) throw new RegraNegocioError('Código do plano não informado');
    if (codPlano <= 0) throw new RegraNegocioError('Código do plano deve ser maior que 0');

    const assinaturas = await this.assinaturaRepository.buscarPorPlano(codPlano);

    if (assinaturas.length === 0) throw new RegistroNaoEncontradoError('Nenhuma assinatura encontrada para o plano');
    return assinaturas;
  }
}
