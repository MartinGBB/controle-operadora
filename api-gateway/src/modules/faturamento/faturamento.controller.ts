import { Controller, Post, Body, Inject, HttpCode } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegistrarPagamentoDTO } from './dto/RegistrarPagamento.dto';


@Controller('faturamento')
export class FaturamentoController {
  constructor(
    @Inject('FATURAMENTO_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('registrarpagamento')
  @HttpCode(201)
  async registrar(@Body() dto: RegistrarPagamentoDTO) {
    await firstValueFrom(
      this.client.send('registrar_pagamento', dto),
      { defaultValue: null } 
    );

    return { message: 'Pagamento registrado com sucesso' };
  }
}