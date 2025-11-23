import { AssinaturaCache } from "../entities/assinatura-cache.model";
import { PagamentoAssinaturaDTO } from "../vo/PagamentoAssinatura";

export abstract class ICacheRepository {
  abstract atualizarAssinaturaCache(pagamento: PagamentoAssinaturaDTO): Promise<AssinaturaCache>;
  abstract verificarSeAssinaturaEstaAtiva(codAssinatura: number): Promise<boolean>;
}