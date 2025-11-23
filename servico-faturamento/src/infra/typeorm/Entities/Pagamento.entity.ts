import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pagamento')
export class Pagamento {
    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    codAssinatura: number;

    @Column()
    valorPago: number;

    @Column()
    dataPagamento: Date;
}