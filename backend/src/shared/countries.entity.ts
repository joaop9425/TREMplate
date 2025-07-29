import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { DefaultColumns } from './defaultColumns';
import { StatesEntity } from './states.entity';

@Entity({
    name: 'countries',
})
export class CountriesEntity extends DefaultColumns {
    @Column()
    name: string;

    @Column({ length: 2 })
    initials: string;

    @OneToMany(() => StatesEntity, (s) => s.id)
    @JoinColumn()
    state: StatesEntity[];
}
