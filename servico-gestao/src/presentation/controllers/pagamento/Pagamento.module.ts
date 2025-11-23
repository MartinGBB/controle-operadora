import { PagamentoPlanoEventoController } from "./pagamento-plano-event.controller";
import { Module } from "@nestjs/common";
import { PagamentoPlano_UC } from "src/application/pagamento/PagamentoPlano_UC";

@Module({
  controllers: [PagamentoPlanoEventoController],
  providers: [PagamentoPlano_UC],
})
export class PagamentoModule {}
