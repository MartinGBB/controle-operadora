import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamentos.contoller';
import { RegistrarPagamento_UC } from 'src/application/RegistrarPagamento_UC';
import { IRegistrarPagamentoRepository } from 'src/domain/repositories/IRegistrarPagamentoRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from 'src/infra/typeorm/Entities/Pagamento.entity';
import { PagamentoORM } from 'src/infra/typeorm/Repositories/PagamentoORM.repository';
import { ServicoPagamento } from 'src/domain/services/ServicoPagamento';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento])],
  controllers: [PagamentoController],
  providers: [
    RegistrarPagamento_UC,
    ServicoPagamento,
    {
      provide: IRegistrarPagamentoRepository,
      useClass: PagamentoORM,
    },
  ],
})
export class PagamentoModule {}
