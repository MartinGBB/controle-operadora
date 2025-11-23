import { AtualizarCacheService } from "src/domain/services/AtualizarCache.service";
import { PagamentoAssinaturaDTO } from "src/domain/vo/PagamentoAssinatura";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AtualizarCache_UC {
    constructor(private readonly cacheService: AtualizarCacheService) {}
    async run(dto: PagamentoAssinaturaDTO): Promise<void> {
        await this.cacheService.atualizaAssinatura(dto);
    }
}
