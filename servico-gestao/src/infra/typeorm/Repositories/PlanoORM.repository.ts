import { Dependencies, Injectable } from '@nestjs/common';
import { PlanoModel } from 'src/domain/entities/Plano.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPlanoRepository } from 'src/domain/repositories/IPlanoRepository';
import { Plano } from '../Entities/Plano.entity';
import { RegistroNaoEncontradoError } from 'src/domain/errors/regra-negocio.error';

@Injectable()
@Dependencies(getRepositoryToken(Plano))
export class PlanoRepositoryORM extends IPlanoRepository {
  #planoRep: Repository<Plano>;

  constructor(Planos: Repository<Plano>) {
    super();
    this.#planoRep = Planos;
  }

  async listarTodos(): Promise<PlanoModel[]> {
    const resp = await this.#planoRep.find();
    return resp.map((planoRep) =>
      PlanoRepositoryORM.createFromObject(planoRep),
    );
  }

  async buscarPorCodigo(codigo: number): Promise<PlanoModel> {
    const plano = await this.#planoRep.findOneBy({ codigo });
    if (!plano) throw new RegistroNaoEncontradoError('Plano não encontrado');
    return PlanoRepositoryORM.createFromObject(plano);
  }

  async atualizarCustoMensal(codigo: number, custoMensal: number): Promise<PlanoModel> {
    await this.#planoRep.update(codigo, { custoMensal });

    const planoAtualizado = await this.buscarPorCodigo(codigo);
    return planoAtualizado;
  }

  static createFromObject(plano: Plano) {
    return new PlanoModel(
      plano.codigo,
      plano.nome,
      plano.custoMensal,
      plano.data,
      plano.descricao,
    );
  }
}
