import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CitiesEntity } from './cities.entity';
import { CountriesEntity } from './countries.entity';
import { DefaultColumns } from './defaultColumns';

@Entity({
    name: 'states',
})
export class StatesEntity extends DefaultColumns {
    @Column()
    name: string;

    @Column()
    initials: string;

    @Column()
    ibgeNumber: number;

    @ManyToOne(() => CountriesEntity, (c) => c.id)
    country: CountriesEntity[];

    @OneToMany(() => CitiesEntity, (c) => c.id)
    @JoinColumn()
    city: CitiesEntity;
}
