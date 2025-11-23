import {
  Bind,
  Body,
  Controller,
  Dependencies,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CriarAssinatura_UC } from 'src/application/assinaturas/CriarAssinatura_UC';
import { ListarAssinaturasPorCliente_UC } from 'src/application/assinaturas/ListarAssinaturasPorCliente_UC';
import { ListarAssinaturasPorPlano_UC } from 'src/application/assinaturas/ListarAssinaturasPorPlano_UC';
import { ListarAssinaturasPorTipo_UC } from 'src/application/assinaturas/ListarAssinaturasPorTipo_UC';
import { AssinaturaTipo } from 'src/domain/repositories/IAssinaturaRepository';
import {
  CriarAssinaturaRequestDTO,
  CriarAssinaturaResponseDTO,
} from './dto/CriarAssinatura.dto';
import { ListarAssinaturaResposeDTO } from './dto/ListarAssinaturaResponse.dto';

@ApiTags('Assinaturas')
@Controller()
@Dependencies(
  CriarAssinatura_UC,
  ListarAssinaturasPorTipo_UC,
  ListarAssinaturasPorCliente_UC,
  ListarAssinaturasPorPlano_UC,
)
export class AssinaturaController {
  constructor(
    private readonly criarUC: CriarAssinatura_UC,
    private readonly listarPorTipoUC: ListarAssinaturasPorTipo_UC,
    private readonly listarPorClienteUC: ListarAssinaturasPorCliente_UC,
    private readonly listarPorPlanoUC: ListarAssinaturasPorPlano_UC,
  ) {
    this.criarUC = criarUC;
    this.listarPorTipoUC = listarPorTipoUC;
    this.listarPorClienteUC = listarPorClienteUC;
    this.listarPorPlanoUC = listarPorPlanoUC;
  }

  @Get('assinatura/:tipo')
  @ApiOperation({ summary: 'Listar assinaturas por tipo (ATIVO/CANCELADO)' })
  @ApiResponse({ status: 200, description: 'Lista de assinaturas retornada com sucesso.' })
  async buscarPorTipo(
    @Param('tipo', new ParseEnumPipe(AssinaturaTipo)) tipo: AssinaturaTipo,
  ): Promise<ListarAssinaturaResposeDTO[]> {
    return this.listarPorTipoUC.run(tipo);
  }

  @Post('assinatura')
  @ApiOperation({ summary: 'Criar nova assinatura' })
  @ApiResponse({ status: 201, description: 'Assinatura criada com sucesso.', type: CriarAssinaturaResponseDTO })
  @Bind(Body())
  criarAssinatura(request: CriarAssinaturaRequestDTO): Promise<CriarAssinaturaResponseDTO> {
    return this.criarUC.run(request);
  }

  @Get('assinaturascliente/:codCli')
  @ApiOperation({ summary: 'Listar assinaturas de um cliente' })
  @ApiResponse({ status: 200, description: 'Lista de assinaturas do cliente.' })
  @Bind(Param('codCli', ParseIntPipe))
  async buscarPorCliente(codCli: number): Promise<ListarAssinaturaResposeDTO[]> {
    return this.listarPorClienteUC.run(codCli);
  }

  @Get('assinaturasplano/:codPlano')
  @ApiOperation({ summary: 'Listar assinaturas de um plano' })
  @ApiResponse({ status: 200, description: 'Lista de assinaturas do plano.' })
  @Bind(Param('codPlano', ParseIntPipe))
  async buscarPorPlano(codPlano: number): Promise<ListarAssinaturaResposeDTO[]> {
    return this.listarPorPlanoUC.run(codPlano);
  }
}
