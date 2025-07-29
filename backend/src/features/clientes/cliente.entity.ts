import { AddressesEntity } from 'src/shared/addresses.entity';
import { DefaultColumns } from 'src/shared/defaultColumns';
import { Column, Entity, OneToMany } from 'typeorm';
import { Contrato } from '../contratos/contrato.entity';
import { OrdemServico } from '../ordem-servico/ordem-servico.entity';
import { Venda } from '../vendas/venda.entity';

@Entity({ name: 'cliente' })
export class Cliente extends DefaultColumns {
    @Column()
    nome: string;

    @Column({ unique: true })
    cpfCnpj: string;

    @Column()
    telefone: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @OneToMany(() => AddressesEntity, (address) => address.ownerId, {
        cascade: false,
    })
    enderecos: AddressesEntity[];
}
