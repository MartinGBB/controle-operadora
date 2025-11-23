import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { GestaoController } from './gestao.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'GESTAO_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get('RABBITMQ_URL') || 'amqp://localhost:5672'], 
            queue: config.get('RABBITMQ_GESTAO_QUEUE') || 'gestao_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [GestaoController],
})
export class GestaoModule {}