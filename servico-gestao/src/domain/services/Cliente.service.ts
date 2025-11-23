import { Injectable } from '@nestjs/common';
import { IClienteRepository } from '../repositories/IClienteRepository';
import { ClienteModel } from '../entities/Cliente.model';
import { RegistroNaoEncontradoError } from '../errors/regra-negocio.error';

@Injectable()
export class ServicoCliente {
  constructor(private clienteRepository: IClienteRepository) {}

  async listarTodos(): Promise<ClienteModel[]> {
    const clientes = await this.clienteRepository.listarTodos();
    return clientes;
  }

  async buscarPorCodigo(codigo: number): Promise<ClienteModel> {
    const cliente = await this.clienteRepository.buscarPorCodigo(codigo);
    if (!cliente) throw new RegistroNaoEncontradoError('Cliente não encontrado');
    return cliente;
  }
}
