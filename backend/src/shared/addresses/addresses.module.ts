import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesEntity } from 'src/shared/addresses.entity';
import { CitiesEntity } from 'src/shared/cities.entity';
import { StatesEntity } from 'src/shared/states.entity';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AddressesEntity, CitiesEntity, StatesEntity]),
    ],
    controllers: [AddressesController],
    providers: [AddressesService],
})
export class AddressesModule {}
