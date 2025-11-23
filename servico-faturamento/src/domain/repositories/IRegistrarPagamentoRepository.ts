import { PagamentoModel } from "../entities/Pagamento.model";

export abstract class IRegistrarPagamentoRepository {
  abstract registrarPagamento(pagamento: PagamentoModel): Promise<void>;
}
