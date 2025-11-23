export class PlanoModel {
  constructor(
    public readonly codigo: number,
    public readonly nome: string,
    public readonly custoMensal: number,
    public readonly data: Date,
    public readonly descricao: string,
  ) {}
}
