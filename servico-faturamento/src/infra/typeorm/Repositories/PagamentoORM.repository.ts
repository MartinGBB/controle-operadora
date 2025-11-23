import { Injectable } from "@nestjs/common";
import { IRegistrarPagamentoRepository } from "src/domain/repositories/IRegistrarPagamentoRepository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Pagamento } from "../Entities/Pagamento.entity";
import { Dependencies } from "@nestjs/common";
import { Repository } from "typeorm";
import { PagamentoModel } from "src/domain/entities/Pagamento.model";

@Injectable()
@Dependencies(getRepositoryToken(Pagamento))
export class PagamentoORM extends IRegistrarPagamentoRepository {
  #pagamentoRep: Repository<Pagamento>;

  constructor(pagamento: Repository<Pagamento>) {
    super();
    this.#pagamentoRep = pagamento;
  }

  async registrarPagamento(pagamento: Pagamento): Promise<void> {
    await this.#pagamentoRep.save(pagamento);
  }

  static createFromObject(pagamento: Pagamento) {
    return new PagamentoModel(
      pagamento.dataPagamento,
      pagamento.codAssinatura,
      pagamento.valorPago,
    );
  }
}
