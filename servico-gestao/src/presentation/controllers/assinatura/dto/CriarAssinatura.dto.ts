import { ApiProperty } from '@nestjs/swagger';

export class CriarAssinaturaRequestDTO {
  @ApiProperty({ description: 'Código do plano'})
  public codPlano: number;

  @ApiProperty({ description: 'Código do cliente'})
  public codCli: number;

  @ApiProperty({ description: 'Custo final da assinatura'})
  public custoFinal: number;

  @ApiProperty({ description: 'Descrição da assinatura'})
  public descricao: string;
}

export class CriarAssinaturaResponseDTO {
  @ApiProperty()
  public codigo: number;

  @ApiProperty()
  public codPlano: number;

  @ApiProperty()
  public codCli: number;

  @ApiProperty()
  public inicioFidelidade: Date;

  @ApiProperty()
  public fimFidelidade: Date;

  @ApiProperty()
  public dataUltimoPagamento: Date;

  @ApiProperty()
  public custoFinal: number;

  @ApiProperty()
  public descricao: string;

  constructor(
    codigo: number,
    codPlano: number,
    codCli: number,
    inicioFidelidade: Date,
    fimFidelidade: Date,
    dataUltimoPagamento: Date,
    custoFinal: number,
    descricao: string,
  ) {
    this.codigo = codigo;
    this.codPlano = codPlano;
    this.codCli = codCli;
    this.inicioFidelidade = inicioFidelidade;
    this.fimFidelidade = fimFidelidade;
    this.dataUltimoPagamento = dataUltimoPagamento;
    this.custoFinal = custoFinal;
    this.descricao = descricao;
  }
}
