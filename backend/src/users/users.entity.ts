import { Exclude } from 'class-transformer';
import { AddressesEntity } from 'src/shared/addresses.entity';
import { DefaultColumns } from 'src/shared/defaultColumns';
import { Column, Entity, OneToMany } from 'typeorm';
import Role from './role.enum';

@Entity({
    name: 'users',
})
export class UsersEntity extends DefaultColumns {
    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Column()
    name: string;

    @Column({
        select: false,
    })
    password: string;

    @Column({
        nullable: true,
    })
    lastLogin: Date;

    @Column({
        nullable: true,
    })
    @Exclude()
    currentHashedRefreshToken?: string;

    @Column({
        nullable: true,
    })
    refreshToken: string;

    @Column({
        nullable: true,
    })
    phone: string;

    @Column({
        name: 'roles',
        type: 'text',
        enum: Role,
        enumName: 'RoleEnum',
        default: Role.User,
    })
    roles: Role;

    @OneToMany(() => AddressesEntity, (a: AddressesEntity) => a.id)
    address: AddressesEntity[];
}
