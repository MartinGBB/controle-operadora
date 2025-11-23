import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Bootstrap_Gestao');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') ?? 3001;

  app.setGlobalPrefix('gestao');

  // Ativa o filtro de erro global
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gestão de Assinaturas')
    .setDescription('API para gerenciar clientes, planos e assinaturas')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const rmqUrl = configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';
  const queueName = configService.get<string>('RABBITMQ_GESTAO_QUEUE') || 'gestao_queue';


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
  logger.log(`🚀 Microserviço de Gestão ouvindo na fila: ${queueName}`);
}

bootstrap();
