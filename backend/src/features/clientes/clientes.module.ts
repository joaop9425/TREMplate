import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesEntity } from 'src/shared/addresses.entity';
import { AddressesService } from 'src/shared/addresses/addresses.service';
import { CitiesEntity } from 'src/shared/cities.entity';
import { StatesEntity } from 'src/shared/states.entity';
import { Cliente } from './cliente.entity';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Cliente,
            AddressesEntity,
            CitiesEntity,
            StatesEntity,
        ]),
    ],
    controllers: [ClientesController],
    providers: [ClientesService, AddressesService],
})
export class ClientesModule {}
