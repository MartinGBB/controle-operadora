import { PlanoModel } from '../entities/Plano.model';

export abstract class IPlanoRepository {
  abstract listarTodos(): Promise<PlanoModel[]>;
  abstract buscarPorCodigo(codigo: number): Promise<PlanoModel>;
  abstract atualizarCustoMensal(
    codigo: number,
    custoMensal: number,
  ): Promise<PlanoModel>;
}
