import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService } from '../../shared/services/base-data.service';
import { Cliente } from '../clientes/cliente.interface';

@Injectable({
    providedIn: 'root'
})
export class ClientesService extends BaseDataService<Cliente, ClienteFiltro> {
    protected apiUrl = 'api/clientes';

    constructor(http: HttpClient) {
        super(http);
    }
}

// Interface para filtros específicos de Clientes
export interface ClienteFiltro {}
