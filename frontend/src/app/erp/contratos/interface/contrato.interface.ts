import { Cliente } from '../../clientes/cliente.interface';

export interface Contrato {
    id: number;
    cliente: Partial<Cliente>;
    dataInicio: Date;
    dataFim: Date;
    valorMensal: number;
    descricao: string;
    status: 'ativo' | 'inativo';
}
