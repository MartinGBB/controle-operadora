import { Injectable } from '@nestjs/common';
import { AssinaturaModel } from '../entities/Assinatura.model';
import { CriarAssinaturaVO } from '../vo/CriarAssinaturaVO';

@Injectable()
export class AssinaturaFactory {
  static criar(dados: CriarAssinaturaVO): AssinaturaModel {
    const dataContratacao = new Date();
    const dataFimFidelidade = new Date(dataContratacao);
    dataFimFidelidade.setFullYear(dataContratacao.getFullYear() + 1); // 1 ano de fidelidad

    return new AssinaturaModel(
      0,
      dados.codPlano,
      dados.codCli,
      dataContratacao,
      dataFimFidelidade,
      dataContratacao, // Data do último pagamento é a data de contratação
      dados.custoFinal,
      dados.descricao,
    );
  }
}
