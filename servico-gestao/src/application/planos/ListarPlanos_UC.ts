import { Dependencies, Injectable } from '@nestjs/common';
import { ServicoPlano } from 'src/domain/services/Plano.service';

@Injectable()
@Dependencies(ServicoPlano)
export class ListarPlanos_UC {
  constructor(private servicoPlano: ServicoPlano) {
    this.servicoPlano = servicoPlano;
  }

  async run() {
    return this.servicoPlano.listarTodos();
  }
}
