import { Injectable } from '@angular/core';
import { BaseDataService } from '../../shared/services/base-data.service';
import { Produto } from '../produtos/interface/produto.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProdutosService extends BaseDataService<Produto, ProdutoFiltro> {
    protected apiUrl = 'api/produtos';

    constructor(http: HttpClient) {
        super(http);
    }
}

// Interface para filtros específicos de produtos
export interface ProdutoFiltro {}
