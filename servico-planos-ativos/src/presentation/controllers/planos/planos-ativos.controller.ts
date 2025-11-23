import { Controller, Dependencies } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PlanoAtivoDTO } from './dto/PlanosAtivosDTO.dto';
import { AtualizarCache_UC } from '../../../application/AtualizarCache_UC';
import { ConsultarStatus_UC } from '../../../application/ConsultarStatus_UC';

@Controller()
@Dependencies(
    AtualizarCache_UC,
    ConsultarStatus_UC,
)
export class PlanosAtivosController {
  constructor(
    private readonly atualizarCacheUC: AtualizarCache_UC,
    private readonly consultarStatusUC: ConsultarStatus_UC,
  ) {}

  // escuta (RabbitMQ)
  @EventPattern('PagamentoPlanoServicoPlanosAtivos')
  async handleEvento(@Payload() data: PlanoAtivoDTO) {
    await this.atualizarCacheUC.run(data);
  }

  // responde (Gateway chama via .send)
  @MessagePattern('verificar_assinatura_ativa')
  async handleConsulta(@Payload() data: { codAss: number }) {
    const estaAtiva = await this.consultarStatusUC.run(Number(data.codAss));
    return { ativa: estaAtiva };
  }
}
