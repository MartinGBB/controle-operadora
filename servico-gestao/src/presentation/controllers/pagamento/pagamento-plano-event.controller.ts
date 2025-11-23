import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PagamentoPlanoDTO } from './dto/Pagamento.dto';
import { PagamentoPlano_UC } from 'src/application/pagamento/PagamentoPlano_UC';
import { Dependencies } from '@nestjs/common';

@Controller()
@Dependencies(PagamentoPlano_UC)
export class PagamentoPlanoEventoController {
  constructor(private readonly pagamentoPlanoUC: PagamentoPlano_UC) {}

  @EventPattern('PagamentoPlanoServicoGestao')
  async handlePagamentoRealizado(@Payload() pagamento: PagamentoPlanoDTO) {
    await this.pagamentoPlanoUC.run(pagamento);
  }
}