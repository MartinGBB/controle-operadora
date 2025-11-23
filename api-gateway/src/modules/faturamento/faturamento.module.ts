import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { FaturamentoController } from './faturamento.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FATURAMENTO_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get('RABBITMQ_URL') || 'amqp://localhost:5672'], 
            queue: config.get('RABBITMQ_FATURAMENTO_QUEUE') || 'faturamento_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [FaturamentoController],
})

export class FaturamentoModule {}
