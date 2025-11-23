import { Controller, Dependencies, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListarClientes_UC } from 'src/application/clientes/ListarClientes_UC';
import { ClienteResponseDTO } from './dto/ListarCliente.dto';

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
}
