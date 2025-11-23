import { Dependencies, Injectable } from '@nestjs/common';
import { ServicoPlano } from 'src/domain/services/Plano.service';

@Injectable()
@Dependencies(ServicoPlano)
export class AtualizarCustoPlano_UC {
  constructor(private servicoPlano: ServicoPlano) {
    this.servicoPlano = servicoPlano;
  }

  async run(codigo: number, custoMensal: number) {
    return this.servicoPlano.atulizarCustoMensal(codigo, custoMensal);
  }
}
