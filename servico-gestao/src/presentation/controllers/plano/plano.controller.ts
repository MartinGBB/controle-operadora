import {
  Bind,
  Body,
  Controller,
  Dependencies,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AtualizarCustoPlano_UC } from 'src/application/planos/AtualizarCustoPlano_UC';
import { ListarPlanos_UC } from 'src/application/planos/ListarPlanos_UC';
import { PlanoResponseDTO } from './dto/Plano.dto';
import { AtualizarCustoPlanoRequestDTO } from './dto/AtualizarCusto.dto';

@ApiTags('Planos')
@Controller('planos')
@Dependencies(ListarPlanos_UC, AtualizarCustoPlano_UC)
export class PlanoController {
  constructor(
    private readonly planoUC: ListarPlanos_UC,
    private readonly atualizarCustoUC: AtualizarCustoPlano_UC,
  ) {
    this.planoUC = planoUC;
    this.atualizarCustoUC = atualizarCustoUC;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os planos' })
  @ApiResponse({ status: 200, description: 'Lista de planos retornada com sucesso.', type: [PlanoResponseDTO] })
  listarTodos(): Promise<PlanoResponseDTO[]> {
    return this.planoUC.run();
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Atualizar custo mensal do plano' })
  @ApiResponse({ status: 200, description: 'Custo atualizado com sucesso.', type: PlanoResponseDTO })
  @Bind(Param('codigo'), Body())
  atualizarCusto(codigo: number, body: AtualizarCustoPlanoRequestDTO): Promise<PlanoResponseDTO> {
    return this.atualizarCustoUC.run(codigo, body.custoMensal);
  }
}
