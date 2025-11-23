import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionToHttpFilter } from './common/filters/exception.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new ExceptionToHttpFilter());

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
  logger.log(`🚀 API Gateway sendo executada na porta: ${port}`);
}
bootstrap();
