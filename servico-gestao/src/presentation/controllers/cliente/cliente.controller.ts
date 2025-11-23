import { Controller, Dependencies, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListarClientes_UC } from 'src/application/clientes/ListarClientes_UC';
import { ClienteResponseDTO } from './dto/ListarCliente.dto';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Clientes')
@Controller('clientes')
@Dependencies(ListarClientes_UC)
export class ClienteController {
  constructor(private readonly clienteUC: ListarClientes_UC) {
    this.clienteUC = clienteUC;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso.', type: [ClienteResponseDTO] })
  listarTodos(): Promise<ClienteResponseDTO[]> {
    return this.clienteUC.run();
  }

  @MessagePattern('listar_clientes')
  async listarRPC() {
    const logger = new Logger(ClienteController.name);
    logger.log('RabbitMQ: Listando clientes...');
    return await this.clienteUC.run();
  }
}
