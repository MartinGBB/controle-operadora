import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3003;

  // Conecta ao RabbitMQ
  const rabbitmqUrl = configService.get('RABBITMQ_URL') || 'amqp://localhost:5672';
  const rabbitmqQueue = configService.get('RABBITMQ_QUEUE') || 'planos_ativos_queue';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queue: rabbitmqQueue,
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`🚀 Planos Ativos rodando na porta ${port} e ouvindo na fila ${rabbitmqQueue}`);
}

bootstrap();
