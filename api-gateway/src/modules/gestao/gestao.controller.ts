import { Controller, Post, Body, Inject, HttpCode } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('gestao')
export class GestaoController {
  constructor(
    @Inject('GESTAO_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('registrarpagament')
  @HttpCode(201)
  async registrarPagamento(@Body() dto: any) {
    return await firstValueFrom(
      this.client.send('GestaoService', dto),
    );
  }
}