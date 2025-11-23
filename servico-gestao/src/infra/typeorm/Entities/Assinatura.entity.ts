import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plano } from './Plano.entity';
import { Cliente } from './Cliente.entity';

@Entity('assinatura')
export class Assinatura {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  codPlano: number;

  @Column()
  codCli: number;

  @Column()
  inicioFidelidade: Date;

  @Column()
  fimFidelidade: Date;

  @Column()
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  custoFinal: number;

  @Column()
  dataUltimoPagamento: Date;

  @ManyToOne(() => Plano, { eager: true, nullable: false })
  @JoinColumn({ name: 'codPlano' })
  plano: Plano;

  @ManyToOne(() => Cliente, { eager: true, nullable: false })
  @JoinColumn({ name: 'codCli' })
  cliente: Cliente;
}
