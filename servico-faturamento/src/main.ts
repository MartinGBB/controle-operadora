import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap_Faturamento');
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3002;

  app.useGlobalFilters(new HttpExceptionFilter()); // Captura as exceções globais

  const rmqUrl = configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';
  const queueName = configService.get<string>('RABBITMQ_FATURAMENTO_QUEUE') || 'faturamento_queue';

  // Cria a aplicação como um Microserviço
  app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue: queueName,
        queueOptions: { durable: false },
      },
    });

// Inicia tudo (HTTP + RabbitMQ)
  await app.startAllMicroservices();
  await app.listen(port);
  
  logger.log(`🚀 Microserviço de Faturamento ouvindo na fila: ${queueName}`);
}

bootstrap();
