import { Dependencies, Injectable } from '@nestjs/common';
import { IAssinaturaRepository } from 'src/domain/repositories/IAssinaturaRepository';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Assinatura } from '../Entities/Assinatura.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssinaturaModel } from 'src/domain/entities/Assinatura.model';
import { AssinaturaCriterioVO } from 'src/domain/vo/AssinaturaCriterioVO';

@Injectable()
@Dependencies(getRepositoryToken(Assinatura))
export class AssinaturaRepositoryORM extends IAssinaturaRepository {
  #assinaturaRep: Repository<Assinatura>;

  constructor(assinatura: Repository<Assinatura>) {
    super();
    this.#assinaturaRep = assinatura;
  }

  async criarAssinatura(input: AssinaturaModel): Promise<AssinaturaModel> {
    const save = await this.#assinaturaRep.save(input);
    return AssinaturaRepositoryORM.createFromObject(save);
  }

  async buscaPorTipo(
    criterio: AssinaturaCriterioVO,
  ): Promise<AssinaturaModel[]> {
    const whereClause = {};

    if (criterio.dataUltimoPagamento) {
      const { operator, value } = criterio.dataUltimoPagamento;
      whereClause['dataUltimoPagamento'] =
        operator === 'gte' ? MoreThan(value) : LessThan(value);
    }

    const assinatura = await this.#assinaturaRep.find({
      where: whereClause,
      relations: ['cliente', 'plano'],
    });

    return assinatura.map((assinaturaRes) =>
      AssinaturaRepositoryORM.createFromObject(assinaturaRes),
    );
  }

  async buscarPorCliente(codCli: number): Promise<AssinaturaModel[]> {
    const assinaturas = await this.#assinaturaRep.find({
      where: { codCli: codCli },
      relations: ['cliente', 'plano'],
    });

    return assinaturas.map((assinatura) =>
      AssinaturaRepositoryORM.createFromObject(assinatura),
    );
  }

  async buscarPorPlano(codPlano: number): Promise<AssinaturaModel[]> {
    const assinaturaPlano = await this.#assinaturaRep.find({
      where: { codPlano },
      relations: ['cliente', 'plano'],
    });

    return assinaturaPlano.map((assinatura) =>
      AssinaturaRepositoryORM.createFromObject(assinatura),
    );
  }

  static createFromObject(assinatura: Assinatura) {
    return new AssinaturaModel(
      assinatura.codigo,
      assinatura.codPlano,
      assinatura.codCli,
      assinatura.inicioFidelidade,
      assinatura.fimFidelidade,
      assinatura.dataUltimoPagamento,
      assinatura.custoFinal,
      assinatura.descricao,
    );
  }
}
