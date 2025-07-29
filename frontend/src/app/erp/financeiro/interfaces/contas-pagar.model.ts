export interface ContasPagar {
    id?: number;
    descricao: string;
    valor: number;
    vencimento: Date;
    status: 'pendente' | 'pago';
}
