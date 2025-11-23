import { Injectable } from '@nestjs/common';
import { IPlanoRepository } from '../repositories/IPlanoRepository';
import { PlanoModel } from '../entities/Plano.model';
import { RegistroNaoEncontradoError, RegraNegocioError } from '../errors/regra-negocio.error';

@Injectable()
export class ServicoPlano {
  constructor(private planoRepository: IPlanoRepository) {}

  async listarTodos(): Promise<PlanoModel[]> {
    const planos = await this.planoRepository.listarTodos();
    return planos;
  }

  async atulizarCustoMensal(codigo: number, custoMensal: number): Promise<PlanoModel> {
    if (!codigo) throw new RegraNegocioError('Código do plano não informado');
    if (codigo <= 0) throw new RegraNegocioError('Código do plano deve ser maior que 0');
    if (!custoMensal) throw new RegraNegocioError('Custo mensal do plano não informado');
    if (custoMensal <= 0) throw new RegraNegocioError('Custo mensal do plano deve ser maior que 0');

    const plano = await this.planoRepository.atualizarCustoMensal(codigo, custoMensal);

    if (!plano) throw new RegistroNaoEncontradoError('Plano não encontrado');
    return plano;
  }

  async buscarPorCodigo(codigo: number): Promise<PlanoModel> {
    const plano = await this.planoRepository.buscarPorCodigo(codigo);
    if (!plano) throw new RegistroNaoEncontradoError('Plano não encontrado');
    return plano;
  }
}
