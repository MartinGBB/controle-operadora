import { PagamentoAssinaturaModel } from "../entities/PagamentoAssinatura.model";

export abstract class ICacheRepository {
  abstract atualizarAssinaturaCache(pagamento: PagamentoAssinaturaModel): Promise<void>;
  abstract buscarAssinaturaCache(codAssinatura: number): Promise<PagamentoAssinaturaModel | undefined>;
}