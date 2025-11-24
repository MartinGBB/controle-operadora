export class PagamentoAssinaturaVO {
  private readonly DIAS_VALIDADE = 30;
  public readonly codAssinatura: number;
  public readonly dataPagamento: Date;
  public readonly valorPago: number;

  constructor(
    codAssinatura: number,
    dataPagamento: Date | string,
    valorPago: number
  ) {
    this.codAssinatura = codAssinatura;
    this.valorPago = valorPago;
    this.dataPagamento = new Date(dataPagamento);
  }

  estaAtiva(): boolean {
    const dataValidade = new Date(this.dataPagamento);
    dataValidade.setDate(dataValidade.getDate() + this.DIAS_VALIDADE);

    const hoje = new Date();
    return dataValidade > hoje;
  }
}