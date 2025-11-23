import { Dependencies, Injectable, Logger } from "@nestjs/common";
import { ServicoPagamento } from "src/domain/services/ServicoPagamento";
import { PagamentoDTO } from "./dtos/PagamentoDTO";

@Injectable()
@Dependencies(ServicoPagamento)
export class RegistrarPagamento_UC {
  #servicoPagamento: ServicoPagamento;

  constructor(servicoPagamento: ServicoPagamento) {
    this.#servicoPagamento = servicoPagamento;
  }

  async run(pagamentoDTO: PagamentoDTO) {
    const logger = new Logger('PagamentoPlanoServicoFaturamento');
    logger.log(`Pagamento processado: ${JSON.stringify(pagamentoDTO)}`);
    await this.#servicoPagamento.registrarPagamento(pagamentoDTO);
  }
}
