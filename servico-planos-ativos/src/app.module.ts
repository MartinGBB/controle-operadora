import { Module } from '@nestjs/common';
import { PlanosAtivosModule } from './presentation/controllers/planos/planos-ativos.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/config/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PlanosAtivosModule,
  ],
})
export class AppModule {}
