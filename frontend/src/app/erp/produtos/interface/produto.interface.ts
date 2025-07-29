export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    tipo: 'novo' | 'usado';
    estoque: number;
    marca: string;
    modelo: string;
}
