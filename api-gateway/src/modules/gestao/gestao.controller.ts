import { Controller, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('gestao')
export class GestaoController {
  constructor(
    @Inject('GESTAO_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('clientes')
  async listarClientes() {
    return await firstValueFrom(this.client.send('listar_clientes', {}));
  }
}