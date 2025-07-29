import { Cliente } from '../../clientes/cliente.interface';

export interface OrdemServico {
    id?: number;
    cliente: Partial<Cliente>;
    dataAbertura: Date;
    dataFechamento: Date;
    status: 'aberta' | 'em_andamento' | 'finalizada' | 'cancelada';
    descricaoProblema: string;
    valorTotal: number;
}
