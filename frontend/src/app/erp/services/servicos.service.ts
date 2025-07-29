import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService } from '../../shared/services/base-data.service';
import { Servico } from '../servicos/interface/servico.interface';

@Injectable({
    providedIn: 'root'
})
export class ServicosService extends BaseDataService<Servico, ServicoFiltro> {
    protected apiUrl = 'api/servicos';

    constructor(http: HttpClient) {
        super(http);
    }
}

// Interface para filtros específicos de produtos
export interface ServicoFiltro {}
