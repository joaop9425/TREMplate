import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../clientes/cliente.interface';
import { Contrato } from '../contratos/interface/contrato.interface';
import { BaseDataService } from '../../shared/services/base-data.service';

@Injectable({
    providedIn: 'root'
})
export class ContratosService extends BaseDataService<Contrato, ContratoFiltro> {
    protected apiUrl = 'api/contratos';

    constructor(http: HttpClient) {
        super(http);
    }

    getContratosPorCategoria(categoria: string): Observable<Contrato[]> {
        return this.http.get<Contrato[]>(`${this.apiUrl}/categoria/${categoria}`);
    }
}

// Interface para filtros específicos de produtos
export interface ContratoFiltro {
    cliente: Cliente;
    dataInicio: Date;
    dataFim: Date;
    valorMensal: number;
    descricao: string;
    status: 'ativo' | 'inativo';
}
