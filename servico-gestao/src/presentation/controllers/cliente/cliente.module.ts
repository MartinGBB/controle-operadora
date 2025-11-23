import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ListarClientes_UC } from 'src/application/clientes/ListarClientes_UC';
import { IClienteRepository } from 'src/domain/repositories/IClienteRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoCliente } from 'src/domain/services/Cliente.service';
import { Cliente } from 'src/infra/typeorm/Entities/Cliente.entity';
import { ClienteRepositoryORM } from 'src/infra/typeorm/Repositories/ClienteORM.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [
    ListarClientes_UC,
    ServicoCliente,
    {
      provide: IClienteRepository,
      useClass: ClienteRepositoryORM,
    },
  ],
  exports: [IClienteRepository],
})
export class ClienteModule {}
