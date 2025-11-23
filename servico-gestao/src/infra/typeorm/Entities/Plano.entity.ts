import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('plano')
export class Plano {
  @PrimaryColumn()
  codigo: number;

  @Column()
  nome: string;

  @Column({ type: 'float' })
  custoMensal: number;

  @Column()
  data: Date;

  @Column()
  descricao: string;
}
