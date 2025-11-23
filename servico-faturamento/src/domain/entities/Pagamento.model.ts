export class PagamentoModel {
  constructor(
    public dataPagamento: Date,
    public codAssinatura: number,
    public valorPago: number,
  ) {}
}
