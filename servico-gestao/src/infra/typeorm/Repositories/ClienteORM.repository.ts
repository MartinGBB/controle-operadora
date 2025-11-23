import { Dependencies, Injectable } from '@nestjs/common';
import { ClienteModel } from 'src/domain/entities/Cliente.model';
import { IClienteRepository } from 'src/domain/repositories/IClienteRepository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../Entities/Cliente.entity';
import { RegistroNaoEncontradoError } from 'src/domain/errors/regra-negocio.error';

@Injectable()
@Dependencies(getRepositoryToken(Cliente))
export class ClienteRepositoryORM extends IClienteRepository {
  #clienteRep: Repository<Cliente>;

  constructor(clientes: Repository<Cliente>) {
    super();
    this.#clienteRep = clientes;
  }

  async listarTodos(): Promise<ClienteModel[]> {
    const resp = await this.#clienteRep.find();
    return resp.map((respCli) =>
      ClienteRepositoryORM.createFromObject(respCli),
    );
  }

  async buscarPorCodigo(codigo: number): Promise<ClienteModel> {
    const cliente = await this.#clienteRep.findOneBy({ codigo });
    if (!cliente) throw new RegistroNaoEncontradoError('Cliente não encontrado');
    return ClienteRepositoryORM.createFromObject(cliente);
  }

  static createFromObject({ codigo, nome, email }: Cliente) {
    return new ClienteModel(codigo, nome, email);
  }
}
