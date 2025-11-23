import { AssinaturaModel } from 'src/domain/entities/Assinatura.model';

export class ListarAssinaturaOutputDTO {
  constructor(
    public codigo: number,
    public codPlano: number,
    public codCli: number,
    public inicioFidelidade: Date,
    public fimFidelidade: Date,
    public dataUltimoPagamento: Date,
    public custoFinal: number,
    public descricao: string,
    public status: 'ATIVO' | 'CANCELADO',
  ) {}

  // Converte Model em DTO
  static fromModel(model: AssinaturaModel): ListarAssinaturaOutputDTO {
    return new ListarAssinaturaOutputDTO(
      model.codigo,
      model.codPlano,
      model.codCli,
      model.inicioFidelidade,
      model.fimFidelidade,
      model.dataUltimoPagamento,
      model.custoFinal,
      model.descricao,
      model.assinaturaAtiva() ? 'ATIVO' : 'CANCELADO',
    );
  }
}
