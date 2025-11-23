import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @PrimaryColumn()
  codigo: number;
  @Column()
  nome: string;
  @Column()
  email: string;
}
