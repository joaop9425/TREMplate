import { Injectable } from '@angular/core';
import { BaseDataService } from '../../shared/services/base-data.service';
import { HttpClient } from '@angular/common/http';
import { OrdemServico } from '../ordem-servico/interface/ordem-servico.interface';

@Injectable({
    providedIn: 'root'
})
export class OrdemServicoService extends BaseDataService<OrdemServico, OrdemServicoFiltro> {
    protected apiUrl = 'api/ordem-servico';

    constructor(http: HttpClient) {
        super(http);
    }
}

// Interface para filtros específicos de produtos
export interface OrdemServicoFiltro {}
