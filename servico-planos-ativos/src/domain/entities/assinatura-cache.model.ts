export class AssinaturaCache {
  constructor(
    public codAssinatura: number,
    public dataPagamento: Date,
    public valorPago: number
  ) {}

  estaAtiva(): boolean {
    const hoje = new Date();
    return this.dataPagamento > hoje;
  }
}
