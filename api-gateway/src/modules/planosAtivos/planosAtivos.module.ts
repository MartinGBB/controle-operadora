import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PlanosAtivosController } from './planosAtivos.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PLANOS_ATIVOS_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get('RABBITMQ_URL') || 'amqp://localhost:5672'], 
            queue: config.get('RABBITMQ_PLANOS_ATIVOS_QUEUE') || 'planos_ativos_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PlanosAtivosController],
})

export class PlanosAtivosModule {}
