import { AssinaturaCriterioVO } from '../vo/AssinaturaCriterioVO';
import { AssinaturaModel } from '../entities/Assinatura.model';

export enum AssinaturaTipo {
  TODOS = 'TODOS',
  ATIVO = 'ATIVO',
  CANCELADO = 'CANCELADO',
}

export abstract class IAssinaturaRepository {
  abstract criarAssinatura(input: AssinaturaModel): Promise<AssinaturaModel>;
  abstract buscaPorTipo(
    criterio: AssinaturaCriterioVO,
  ): Promise<AssinaturaModel[]>;
  abstract buscarPorCliente(codCli: number): Promise<AssinaturaModel[]>;
  abstract buscarPorPlano(codPlano: number): Promise<AssinaturaModel[]>;
}
