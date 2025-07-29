import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEnderecoDto {
    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    zipCode: string;

    @IsString()
    @IsNotEmpty()
    localNumber: string;

    @IsString()
    @IsOptional()
    reference: string;

    @IsNotEmpty()
    cityId: number;
}
