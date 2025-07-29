import { Cliente } from '../../clientes/cliente.interface';

export interface Venda {
    id?: number;
    cliente: Partial<Cliente>;
    data: Date;
    valorTotal: number;
    produtos: any[];
}
