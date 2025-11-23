import { PagamentoAssinaturaDTO } from "../vo/PagamentoAssinatura";

export abstract class ICacheRepository {
  abstract atualizarAssinaturaCache(pagamento: PagamentoAssinaturaDTO): Promise<void>;
  abstract buscarAssinaturaCache(codAssinatura: number): Promise<PagamentoAssinaturaDTO | undefined>;
}