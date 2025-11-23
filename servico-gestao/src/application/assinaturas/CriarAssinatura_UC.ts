import { Dependencies, Injectable } from '@nestjs/common';
import { ServicoAssinatura } from 'src/domain/services/Assinatura.service';
import { CriarAssinaturaDTO } from '../dtos/assinaturas/CriarAssinaturaDTO';

@Injectable()
@Dependencies(ServicoAssinatura)
export class CriarAssinatura_UC {
  #servicoAssinatura: ServicoAssinatura;

  constructor(servicoAssinatura: ServicoAssinatura) {
    this.#servicoAssinatura = servicoAssinatura;
  }

  async run(request: CriarAssinaturaDTO) {
    return this.#servicoAssinatura.criarAssinatura(request);
  }
}
