import { AddressesEntity } from 'src/shared/addresses.entity';
import { DefaultColumns } from 'src/shared/defaultColumns';
import { Column, Entity, OneToMany } from 'typeorm';

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
