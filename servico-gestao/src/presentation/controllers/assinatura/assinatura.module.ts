import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssinaturaController } from './assinatura.controller';
import { ServicoAssinatura } from 'src/domain/services/Assinatura.service';
import { IAssinaturaRepository } from 'src/domain/repositories/IAssinaturaRepository';
import { ListarAssinaturasPorCliente_UC } from 'src/application/assinaturas/ListarAssinaturasPorCliente_UC';
import { ListarAssinaturasPorPlano_UC } from 'src/application/assinaturas/ListarAssinaturasPorPlano_UC';
import { CriarAssinatura_UC } from 'src/application/assinaturas/CriarAssinatura_UC';
import { ListarAssinaturasPorTipo_UC } from 'src/application/assinaturas/ListarAssinaturasPorTipo_UC';
import { AssinaturaRepositoryORM } from 'src/infra/typeorm/Repositories/AssinaturaORM.repository';
import { Assinatura } from 'src/infra/typeorm/Entities/Assinatura.entity';
import { ClienteModule } from '../cliente/cliente.module';
import { PlanoModule } from '../plano/plano.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assinatura]),
    ClienteModule,
    PlanoModule,
  ],
  controllers: [AssinaturaController],
  providers: [
    CriarAssinatura_UC,
    ListarAssinaturasPorTipo_UC,
    ListarAssinaturasPorCliente_UC,
    ListarAssinaturasPorPlano_UC,
    ServicoAssinatura,
    {
      provide: IAssinaturaRepository,
      useClass: AssinaturaRepositoryORM,
    },
  ],
})
export class AssinaturaModule {}
