export interface Cliente {
    nome: string;
    telefone: string;
    email: string;
    cpfCnpj: string;
    endereco?: Endereco;
    id?: number;
    editar?: any;
    deletar?: any;
    selected?: boolean;
}


export interface Endereco {
    zipCode?: string;
    street?: string;
    neighbourhood?: string;
    localNumber?: string;
    reference?: string;
    cityId?: number | null;
    stateId?: number | null;
}
