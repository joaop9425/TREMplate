import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesEntity } from 'src/shared/addresses.entity';
import { AddressesService } from 'src/shared/addresses/addresses.service';
import { CitiesEntity } from 'src/shared/cities.entity';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
        @InjectRepository(AddressesEntity)
        private readonly enderecoRepository: Repository<AddressesEntity>,
        @InjectRepository(CitiesEntity)
        private readonly cidadeRepository: Repository<CitiesEntity>,
        private readonly addressService: AddressesService,
    ) {}

    async create(dto: CreateClienteDto): Promise<Cliente> {
        const { endereco: enderecoDto, ...dadosCliente } = dto;

        try {
            const cliente = this.clienteRepository.create(dadosCliente);
            const clienteSalvo = await this.clienteRepository.save(cliente);

            if (enderecoDto) {
                const endereco = await this.addressService.createAddress(
                    enderecoDto,
                    clienteSalvo.id,
                    'cliente',
                );
                clienteSalvo.enderecos = [endereco]; // ou concat se já tiver
            }

            return clienteSalvo;
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            // Aqui lança uma exceção esperta
            throw new BadRequestException({
                message: 'Erro ao salvar cliente',
                detail: error?.detail || error?.message,
            });
        }
    }

    async findAll(): Promise<{ items: Cliente[]; count: number }> {
        const [items, count] = await this.clienteRepository.findAndCount({
            order: { nome: 'ASC' },
        });
        return { items, count };
    }

    async findOne(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOneBy({ id });
        if (!cliente) throw new NotFoundException('Cliente não encontrado');
        return cliente;
    }

    async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({
            where: { id },
        });

        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado');
        }

        // Atualiza os dados do cliente (sem o campo endereco)
        const { endereco: enderecoDto, ...dadosCliente } = dto;
        Object.assign(cliente, dadosCliente);
        const clienteAtualizado = await this.clienteRepository.save(cliente);

        // Se o DTO tem endereço, atualiza ou cria o endereço separado
        if (enderecoDto) {
            // Tenta achar o endereço já existente do cliente
            let endereco = await this.enderecoRepository.findOne({
                where: {
                    ownerId: cliente.id,
                    ownerType: 'cliente',
                },
            });

            const { cityId, ...dadosEndereco } = enderecoDto;

            let cidade = undefined;
            if (cityId) {
                cidade = await this.cidadeRepository.findOneBy({
                    id: cityId,
                });
                if (!cidade) {
                    throw new NotFoundException('Cidade não encontrada');
                }
            }

            if (endereco) {
                // Se já existe, atualiza
                Object.assign(endereco, dadosEndereco);
                if (cidade) endereco.city = cidade;
                await this.enderecoRepository.save(endereco);
            } else {
                // Se não existe, cria novo
                endereco = this.enderecoRepository.create({
                    ...dadosEndereco,
                    city: cidade,
                    ownerId: cliente.id,
                    ownerType: 'cliente',
                });
                await this.enderecoRepository.save(endereco);
            }
        }

        return clienteAtualizado;
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id); // garante que existe
        await this.clienteRepository.delete(id);
    }
}
