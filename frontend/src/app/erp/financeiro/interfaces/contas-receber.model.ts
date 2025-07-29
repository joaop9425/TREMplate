export interface ContasReceber {
    id?: number;
    descricao: string;
    valor: number;
    vencimento: Date;
    status: 'pendente' | 'recebido';
}
