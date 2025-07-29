export interface FluxoCaixa {
    id?: number;
    descricao: string;
    valor: number;
    tipo: 'entrada' | 'saida';
    data: Date;
}
