import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesEntity } from 'src/shared/addresses.entity';
import { CitiesEntity } from 'src/shared/cities.entity';
import { CreateEnderecoDto } from 'src/shared/dto/create-endereco.dto';
import { Repository } from 'typeorm';
import { StatesEntity } from '../states.entity';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(AddressesEntity)
        private readonly enderecoRepository: Repository<AddressesEntity>,
        @InjectRepository(CitiesEntity)
        private readonly cidadeRepository: Repository<CitiesEntity>,
        @InjectRepository(StatesEntity)
        private readonly estadoRepository: Repository<StatesEntity>,
    ) {}

    async createAddress(
        dadosEndereco: CreateEnderecoDto,
        donoId: number,
        donoTipo: 'cliente' | 'user',
    ) {
        const cidade = await this.cidadeRepository.findOneBy({
            id: dadosEndereco.cityId,
        });
        if (!cidade) throw new NotFoundException('Cidade não encontrada');

        const endereco = this.enderecoRepository.create({
            ...dadosEndereco,
            city: cidade,
            ownerId: donoId,
            ownerType: donoTipo,
        });

        return await this.enderecoRepository.save(endereco);
    }

    async getAllCities() {
        const cidades = await this.cidadeRepository.find({
            order: { name: 'ASC' },
        });
        return cidades;
    }

    async getAllStates() {
        return await this.estadoRepository.find({
            order: { name: 'ASC' },
        });
    }

    async getCitiesByState(stateId: number) {
        const [items] = await this.cidadeRepository.findAndCount({
            where: { state: { id: stateId } },
            relations: ['state'],
            order: { name: 'ASC' },
        });
        return items;
    }
}
