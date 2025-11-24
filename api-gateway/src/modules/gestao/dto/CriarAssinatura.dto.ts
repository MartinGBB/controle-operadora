export class CriarAssinaturaRequestDTO {
  codCli: number;
  codPlano: number;
  custoFinal: number;
  descricao: string;
}

export class CriarAssinaturaResponseDTO {
  codigo: number;
  codPlano: number;
  codCli: number;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;
}