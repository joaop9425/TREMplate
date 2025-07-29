import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreateEnderecoDto } from 'src/shared/dto/create-endereco.dto';

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    cpfCnpj: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @IsOptional()
    email?: string;

    @ValidateNested()
    @Type(() => CreateEnderecoDto)
    endereco: CreateEnderecoDto;
}
