import { Dependencies, Injectable } from '@nestjs/common';
import { ServicoCliente } from 'src/domain/services/Cliente.service';

@Injectable()
@Dependencies(ServicoCliente)
export class ListarClientes_UC {
  constructor(private servicoCliente: ServicoCliente) {
    this.servicoCliente = servicoCliente;
  }

  async run() {
    return this.servicoCliente.listarTodos();
  }
}
