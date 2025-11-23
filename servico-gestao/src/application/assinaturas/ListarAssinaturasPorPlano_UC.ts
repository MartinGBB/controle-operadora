import { Dependencies, Injectable } from '@nestjs/common';
import { ServicoAssinatura } from 'src/domain/services/Assinatura.service';
import { ListarAssinaturaOutputDTO } from '../dtos/assinaturas/ListarAssinaturaOutputDTO';

@Injectable()
@Dependencies(ServicoAssinatura)
export class ListarAssinaturasPorPlano_UC {
  constructor(private readonly servicoAssinatura: ServicoAssinatura) {}

  async run(codPlano: number): Promise<ListarAssinaturaOutputDTO[]> {
    const assinaturas = await this.servicoAssinatura.buscarPorPlano(codPlano);
    return assinaturas.map((model) => ListarAssinaturaOutputDTO.fromModel(model));
  }
}
