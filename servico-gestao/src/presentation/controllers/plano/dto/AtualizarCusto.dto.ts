import { ApiProperty } from "@nestjs/swagger";

export class AtualizarCustoPlanoRequestDTO {
  @ApiProperty()
  public readonly custoMensal: number;
}
