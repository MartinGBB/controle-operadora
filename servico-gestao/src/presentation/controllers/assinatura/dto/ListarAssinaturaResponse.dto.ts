export class ListarAssinaturaResposeDTO {
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
}
