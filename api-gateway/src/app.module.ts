import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FaturamentoModule } from './modules/faturamento/faturamento.module';
import { GestaoModule } from './modules/gestao/gestao.module';
import { PlanosAtivosModule } from './modules/planosAtivos/planosAtivos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FaturamentoModule,
    GestaoModule,
    PlanosAtivosModule,
  ],
})
export class AppModule {}