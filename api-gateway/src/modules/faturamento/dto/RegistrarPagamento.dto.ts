export class RegistrarPagamentoDTO {
    constructor(
        public dataPagamento: Date,
        public codAssinatura: number,
        public valorPago: number,
    ) {}
}

