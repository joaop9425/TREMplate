import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseDataService } from '../../shared/services/base-data.service';
import { Venda } from '../vendas/interface/venda.interface';

@Injectable({
    providedIn: 'root'
})
export class VendasService extends BaseDataService<Venda, VendasFiltro> {
    protected apiUrl = 'api/vendas';

    constructor(http: HttpClient) {
        super(http);
    }
}

// Interface para filtros específicos de produtos
export interface VendasFiltro {}
