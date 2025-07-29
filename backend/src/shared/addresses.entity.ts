import { CitiesEntity } from './cities.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultColumns } from './defaultColumns';

@Entity({ name: 'addresses' })
export class AddressesEntity extends DefaultColumns {
    @Column()
    street: string;

    @Column({ nullable: true })
    neighbourhood: string;

    @Column()
    zipCode: string;

    @Column()
    localNumber: string;

    @Column()
    reference: string;

    @ManyToOne(() => CitiesEntity, (city) => city.id, { nullable: true })
    @JoinColumn()
    city: CitiesEntity;

    @Column({ type: 'int', nullable: true })
    ownerId: number;

    @Column({ nullable: true })
    ownerType: 'cliente' | 'user'; // tipo de dono
}
