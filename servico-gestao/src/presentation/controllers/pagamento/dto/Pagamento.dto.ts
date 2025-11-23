export class PagamentoPlanoDTO {
    constructor(
        public dataPagamento: Date,
        public codAssinatura: number,
        public valorPago: number,
    ) {}
}