import { ClienteModel } from '../entities/Cliente.model';

export abstract class IClienteRepository {
  abstract listarTodos(): Promise<ClienteModel[]>;
  abstract buscarPorCodigo(codigo: number): Promise<ClienteModel>;
}
