import { Controller, Inject, Post, HttpCode, Body, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('planosativos')
export class PlanosAtivosController {
  constructor(
    @Inject('PLANOS_ATIVOS_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get(':codAss')
  async verificarAssinaturaAtiva(@Param('codAss', ParseIntPipe) codAss: number) {
    const ativa = await firstValueFrom(
      this.client.send('verificar_assinatura_ativa', { codAss: codAss }),
      { defaultValue: false } 
    );

    return { ativa };
  }
}
