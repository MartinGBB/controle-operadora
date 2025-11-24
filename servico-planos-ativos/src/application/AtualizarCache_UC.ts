import { AtualizarCacheService } from "src/domain/services/AtualizarCache.service";
import { Injectable } from "@nestjs/common";
import { Dependencies } from "@nestjs/common";
import { PagamentoAssinaturaDTO } from "./dtos/PagamentoAssinatura.dto";

@Injectable()
@Dependencies(AtualizarCacheService)
export class AtualizarCache_UC {
    constructor(private readonly cacheService: AtualizarCacheService) {}
    async run(dto: PagamentoAssinaturaDTO): Promise<void> {
        await this.cacheService.atualizaAssinatura(dto);
    }
}
