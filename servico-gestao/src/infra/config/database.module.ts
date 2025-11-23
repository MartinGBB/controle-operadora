import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedingService } from '../typeorm/seeding.service';
import { Assinatura } from '../typeorm/Entities/Assinatura.entity';
import { Plano } from '../typeorm/Entities/Plano.entity';
import { Cliente } from '../typeorm/Entities/Cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: config.get<'mysql' | 'mariadb'>('DATABASE_TYPE'),
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
    }),
    TypeOrmModule.forFeature([Cliente, Plano, Assinatura]),
  ],
  providers: [SeedingService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
