import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoController } from './plano.controller';
import { ListarPlanos_UC } from 'src/application/planos/ListarPlanos_UC';
import { ServicoPlano } from 'src/domain/services/Plano.service';
import { IPlanoRepository } from 'src/domain/repositories/IPlanoRepository';
import { AtualizarCustoPlano_UC } from 'src/application/planos/AtualizarCustoPlano_UC';
import { Plano } from 'src/infra/typeorm/Entities/Plano.entity';
import { PlanoRepositoryORM } from 'src/infra/typeorm/Repositories/PlanoORM.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Plano])],
  controllers: [PlanoController],
  providers: [
    ListarPlanos_UC,
    AtualizarCustoPlano_UC,
    ServicoPlano,
    {
      provide: IPlanoRepository,
      useClass: PlanoRepositoryORM,
    },
  ],
  exports: [IPlanoRepository],
})
export class PlanoModule {}
