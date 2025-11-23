import { ApiProperty } from '@nestjs/swagger';

export class PlanoResponseDTO {
  @ApiProperty()
  public readonly codigo: number;

  @ApiProperty()
  public readonly nome: string;

  @ApiProperty()
  public readonly custoMensal: number;

  @ApiProperty()
  public readonly data: Date;

  @ApiProperty()
  public readonly descricao: string;

  constructor(
    codigo: number,
    nome: string,
    custoMensal: number,
    data: Date,
    descricao: string,
  ) {
    this.codigo = codigo;
    this.nome = nome;
    this.custoMensal = custoMensal;
    this.data = data;
    this.descricao = descricao;
  }
}

