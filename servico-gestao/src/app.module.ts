import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/config/database.module';
import { ClienteModule } from './presentation/controllers/cliente/cliente.module';
import { PlanoModule } from './presentation/controllers/plano/plano.module';
import { AssinaturaModule } from './presentation/controllers/assinatura/assinatura.module';
import { PagamentoModule } from './presentation/controllers/pagamento/Pagamento.module';
import { RabbitMQModule } from './infra/messaging/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RabbitMQModule,
    ClienteModule,
    PlanoModule,
    AssinaturaModule,
    PagamentoModule,
  ],
})
export class AppModule {}
