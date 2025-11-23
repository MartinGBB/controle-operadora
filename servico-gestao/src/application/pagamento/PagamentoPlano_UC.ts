import { Injectable, Logger } from '@nestjs/common';
import { PagamentoDTO } from '../dtos/pagamento/PagamentoDTO';

@Injectable()
export class PagamentoPlano_UC {
  async run(Pagamento: PagamentoDTO) {    
    const logger = new Logger('PagamentoPlanoServicoGestao');
    logger.log('Pagamento recebido: ', JSON.stringify(Pagamento));   
  }
}