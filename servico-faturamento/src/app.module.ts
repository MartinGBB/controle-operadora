import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/config/database.module';
import { PagamentoModule } from './presentation/controllers/pagamentos/pagamento.module';
import { RabbitMQModule } from './infra/messaging/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RabbitMQModule,
    PagamentoModule,
  ],
})

export class AppModule {}
