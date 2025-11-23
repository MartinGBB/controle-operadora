import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FaturamentoModule } from './modules/faturamento/faturamento.module';
import { GestaoModule } from './modules/gestao/gestao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FaturamentoModule,
    GestaoModule,
  ],
})
export class AppModule {}