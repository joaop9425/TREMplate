import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AddressesEntity } from './addresses.entity';
import { DefaultColumns } from './defaultColumns';
import { StatesEntity } from './states.entity';

@Entity({
    name: 'cities',
})
export class CitiesEntity extends DefaultColumns {
    @Column()
    name: string;

    @Column()
    ibgeNumber: number;

    @ManyToOne(() => StatesEntity, (s) => s.id)
    @JoinColumn()
    state: StatesEntity;

    @OneToMany(() => AddressesEntity, (a) => a.id)
    address: AddressesEntity[];
}
