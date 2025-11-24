import { Controller, Inject, Get, Patch, Param, ParseIntPipe, Body, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AtualizarCustoPlanoRequestDTO } from './dto/AtualizarCusto.dto';
import { CriarAssinaturaRequestDTO, CriarAssinaturaResponseDTO } from './dto/CriarAssinatura.dto';

@Controller('gestao')
export class GestaoController {
  constructor(
    @Inject('GESTAO_SERVICE') private readonly client: ClientProxy,
  ) {}

  // CLIENTES
  @Get('clientes')
  async listarClientes() {
    return await firstValueFrom(this.client.send('listar_clientes', {}));
  }

  // PLANOS
  @Get('planos')
  async listarTodos() {
    return await firstValueFrom(this.client.send('listar_planos', {}));
  }

  @Patch('planos/:idPlano')
    async atualizarCusto(
      @Param('idPlano', ParseIntPipe) idPlano: number,
      @Body() dto: AtualizarCustoPlanoRequestDTO
    ) {
      return await firstValueFrom(
        this.client.send('atualizar_custo_plano', { 
          codigo: idPlano, 
          custoMensal: dto.custoMensal 
        })
      );
    }

  // ASSINATURAS
  @Post('assinaturas')
  async criarAssinatura(@Body() dto: CriarAssinaturaRequestDTO): Promise<CriarAssinaturaResponseDTO> {
    return await firstValueFrom(
      this.client.send('criar_assinatura', dto)
    );
  }

  @Get('assinaturas/tipo/:tipo')
  async listarPorTipo(@Param('tipo') tipo: string) {
    return await firstValueFrom(
      this.client.send('listar_assinaturas_tipo', tipo)
    );
  }

  @Get('assinaturascliente/:codCli')
  async listarPorCliente(@Param('codCli', ParseIntPipe) codCli: number) {
    return await firstValueFrom(
      this.client.send('listar_assinaturas_cliente', codCli)
    );
  }

  @Get('assinaturasplano/:codPlano')
  async listarPorPlano(@Param('codPlano', ParseIntPipe) codPlano: number) {
    return await firstValueFrom(
      this.client.send('listar_assinaturas_plano', codPlano)
    );
  }
}
