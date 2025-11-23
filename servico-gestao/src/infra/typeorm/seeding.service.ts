import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './Entities/Cliente.entity';
import { Plano } from './Entities/Plano.entity';
import { Assinatura } from './Entities/Assinatura.entity';

@Injectable()
export class SeedingService implements OnModuleInit {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    @InjectRepository(Plano)
    private readonly planoRepo: Repository<Plano>,
    @InjectRepository(Assinatura)
    private readonly assinaturaRepo: Repository<Assinatura>,
  ) {}

  async onModuleInit() {
    await this.seedClientes();
    await this.seedPlanos();
    await this.seedAssinaturas();
  }

  private async seedClientes() {
    // Verifica se já existem dados para evitar duplicidade
    const count = await this.clienteRepo.count();
    if (count > 0) {
      console.log('Seed Clientes: Já existem dados. Pulando...');
      return;
    }

    const clientes: Partial<Cliente>[] = [];
    for (let i = 1; i <= 10; i++) {
      clientes.push({
        codigo: i, // Se o ID não for auto-incremento na sua regra
        nome: `Cliente Teste ${i}`,
        email: `cliente${i}@operadora.com`,
      });
    }
    await this.clienteRepo.save(clientes);
    console.log('Seed Clientes: 10 clientes criados.');
  }

  private async seedPlanos() {
    const count = await this.planoRepo.count();
    if (count > 0) {
      console.log('Seed Planos: Já existem dados. Pulando...');
      return;
    }

    const planos = [
      {
        codigo: 1,
        nome: 'Fibra 100MB',
        custoMensal: 99.9,
        data: new Date(),
        descricao: 'Internet Fibra 100MB residencial',
      },
      {
        codigo: 2,
        nome: 'Fibra 300MB',
        custoMensal: 149.9,
        data: new Date(),
        descricao: 'Internet Fibra 300MB + Wifi 6',
      },
      {
        codigo: 3,
        nome: 'Móvel Controle',
        custoMensal: 49.9,
        data: new Date(),
        descricao: '4G Ilimitado apps sociais',
      },
      {
        codigo: 4,
        nome: 'Combo Família',
        custoMensal: 250.0,
        data: new Date(),
        descricao: 'Fibra 500MB + 2 Chips Móveis',
      },
      {
        codigo: 5,
        nome: 'Empresarial Pro',
        custoMensal: 500.0,
        data: new Date(),
        descricao: 'Link Dedicado + IP Fixo',
      },
    ];

    await this.planoRepo.save(planos);
    console.log('Seed Planos: 5 planos criados.');
  }

  private async seedAssinaturas() {
    const count = await this.assinaturaRepo.count();
    if (count > 0) {
      console.log('Seed Assinaturas: Já existem dados. Pulando...');
      return;
    }

    // Datas de referência
    const hoje = new Date();
    const umAnoDepois = new Date(hoje);
    umAnoDepois.setFullYear(hoje.getFullYear() + 1);

    const quarentaDiasAtras = new Date(hoje);
    quarentaDiasAtras.setDate(hoje.getDate() - 40); // 40 dias atrás: assinatura expirada

    const trintaDiasDepois = new Date(hoje);
    trintaDiasDepois.setDate(hoje.getDate() + 30); // 30 dias no futuro: Inativa

    const assinaturaData = [
      // 1. ATIVA e VÁLIDA
      {
        codigo: 1,
        codPlano: 1,
        codCli: 1,
        custoFinal: 89.9, // Valor com desconto
        descricao: 'Assinatura ATIVA com fidelidade e pagamento recente.',
        inicioFidelidade: new Date(quarentaDiasAtras),
        fimFidelidade: umAnoDepois,
        dataUltimoPagamento: new Date(hoje.setDate(hoje.getDate() - 5)), // Pagou 5 dias atrás
      },
      // 2. EXPIRADA
      {
        codigo: 2,
        codPlano: 2,
        codCli: 2,
        custoFinal: 149.9, // Valor sem desconto
        descricao: 'Assinatura INATIVA: Pagamento atrasado (40 dias).',
        inicioFidelidade: new Date(quarentaDiasAtras),
        fimFidelidade: umAnoDepois,
        dataUltimoPagamento: new Date(quarentaDiasAtras),
      },
      // 3. FUTURA/PENDENTE (Fidelidade começa em 30 dias - inativa no momento)
      {
        codigo: 3,
        codPlano: 3,
        codCli: 3,
        custoFinal: 49.9,
        descricao: 'Assinatura INATIVA: Início da fidelidade é futuro.',
        inicioFidelidade: trintaDiasDepois,
        fimFidelidade: new Date(
          trintaDiasDepois.setFullYear(trintaDiasDepois.getFullYear() + 1),
        ),
        dataUltimoPagamento: new Date(),
      },
      // 4. ATIVA mas SEM FIDELIDADE (fimFidelidade já passou, mas pagamento está em dia)
      {
        codigo: 4,
        codPlano: 4,
        codCli: 4,
        custoFinal: 250.0,
        descricao: 'Assinatura ATIVA, mas SEM fidelidade no momento.',
        inicioFidelidade: new Date(
          umAnoDepois.setFullYear(hoje.getFullYear() - 2),
        ), // 2 anos atrás
        fimFidelidade: new Date(hoje.setMonth(hoje.getMonth() - 2)), // 2 meses atrás
        dataUltimoPagamento: new Date(),
      },
      // 5. ATIVA (Assinatura básica, pagamento no limite de 29 dias)
      {
        codigo: 5,
        codPlano: 5,
        codCli: 5,
        custoFinal: 500.0,
        descricao: 'Assinatura ATIVA: Pagamento no limite.',
        inicioFidelidade: new Date(hoje),
        fimFidelidade: umAnoDepois,
        dataUltimoPagamento: new Date(hoje.setDate(hoje.getDate() - 29)), // Pagou 29 dias atrás
      },
    ];

    await this.assinaturaRepo.save(assinaturaData as Partial<Assinatura>[]);
    console.log(
      'Seed Assinaturas: 5 assinaturas criadas (3 ATIVAS, 2 INATIVAS).',
    );
  }
}
