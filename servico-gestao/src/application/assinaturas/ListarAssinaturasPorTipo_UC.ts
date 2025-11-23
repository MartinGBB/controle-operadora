import { Dependencies, Injectable } from '@nestjs/common';
import { ServicoAssinatura } from 'src/domain/services/Assinatura.service';
import { AssinaturaTipo } from 'src/domain/repositories/IAssinaturaRepository';
import { ListarAssinaturaOutputDTO } from '../dtos/assinaturas/ListarAssinaturaOutputDTO';

@Injectable()
@Dependencies(ServicoAssinatura)
export class ListarAssinaturasPorTipo_UC {
  #servicoAssinatura: ServicoAssinatura;

  constructor(servicoAssinatura: ServicoAssinatura) {
    this.#servicoAssinatura = servicoAssinatura;
  }

  async run(tipo: AssinaturaTipo) {
    const assinaturas = await this.#servicoAssinatura.buscaPorTipo(tipo);

    return assinaturas.map((assinatura) =>
      ListarAssinaturaOutputDTO.fromModel(assinatura),
    );
  }
}
