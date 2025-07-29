import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContasPagarListaComponent } from './components/contas-pagar-lista/contas-pagar-lista.component';
import { ContasReceberListaComponent } from './components/contas-receber-lista/contas-receber-lista.component';
import { FluxoCaixaListaComponent } from './components/fluxo-caixa-lista/fluxo-caixa-lista.component';

@Component({
    selector: 'app-financeiro',
    imports: [CommonModule, ContasPagarListaComponent, ContasReceberListaComponent, FluxoCaixaListaComponent],
    template: `
        <app-contas-pagar-lista />
        <app-contas-receber-lista />
        <app-fluxo-caixa-lista />
    `,
    styles: []
})
export class FinanceiroComponent {}
