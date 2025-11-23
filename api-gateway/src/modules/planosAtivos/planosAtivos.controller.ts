import { Controller, Inject, Post, HttpCode, Body, Get, Param } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('planosativos')
export class PlanosAtivosController {
  constructor(
    @Inject('PLANOS_ATIVOS_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get(':codeAss')
  async verificarAssinaturaAtiva(@Param('codeAss') codeAss: number) {
    const ativa = await firstValueFrom(
      this.client.send('verificar_assinatura_ativa', { codAss: codeAss }),
      { defaultValue: false } 
    );

    return { ativa };
  }
}
