export const TIME_MS_DAY = 24 * 60 * 60 * 1000;
export const THIRTY_DAYS = 30 * TIME_MS_DAY; // 30 dias (milissegundos)

export class AssinaturaModel {
  constructor(
    public readonly codigo: number,
    public readonly codPlano: number,
    public readonly codCli: number,
    public readonly inicioFidelidade: Date,
    public readonly fimFidelidade: Date,
    public readonly dataUltimoPagamento: Date,
    public readonly custoFinal: number,
    public readonly descricao: string,
  ) {}

  assinaturaAtiva(): boolean {
    const hoje = new Date();
    return this.dataUltimoPagamento >= new Date(hoje.getTime() - THIRTY_DAYS);
  }
}
