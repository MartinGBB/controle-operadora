export class DateFilterVO {
  constructor(
    public readonly operator: 'gte' | 'lt', // 'gte' (maior ou igual), 'lt' (menor que)
    public readonly value: Date,
  ) {
    if (!value) throw new Error('Valor de data inválido');
  }
}

// Define o critério específico para busca de assinaturas
export class AssinaturaCriterioVO {
  constructor(public readonly dataUltimoPagamento?: DateFilterVO) {}
}
