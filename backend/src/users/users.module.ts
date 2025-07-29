import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesEntity } from 'src/shared/addresses.entity';
import { CitiesEntity } from 'src/shared/cities.entity';
import { CountriesEntity } from 'src/shared/countries.entity';
import { StatesEntity } from 'src/shared/states.entity';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsersEntity,
            AddressesEntity,
            CitiesEntity,
            StatesEntity,
            CountriesEntity,
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
