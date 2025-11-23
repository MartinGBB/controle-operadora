export class PagamentoDTO {
    constructor(
        public dia: number,
        public mes: number,
        public ano: number,
        public codAssinatura: number,
        public valorPago: number,
    ) {}
}