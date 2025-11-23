import { Module } from "@nestjs/common";
import { PlanosAtivosController } from "./planos-ativos.controller";
import { AtualizarCacheService } from "../../../domain/services/AtualizarCache.service";
import { ConsultarStatusService } from "../../../domain/services/ConsultarStatusAssinatura.service";
import { AtualizarCache_UC } from "../../../application/AtualizarCache_UC";
import { ConsultarStatus_UC } from "../../../application/ConsultarStatus_UC";
import { DatabaseModule } from "src/infra/config/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [PlanosAtivosController],
    providers: [
      AtualizarCache_UC,
      ConsultarStatus_UC,
      AtualizarCacheService,
      ConsultarStatusService,
    ],
    exports: [],
})
export class PlanosAtivosModule {}
