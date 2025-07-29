import { Route } from '@angular/router';
import { ContasPagarListaComponent } from './components/contas-pagar-lista/contas-pagar-lista.component';
import { ContasReceberListaComponent } from './components/contas-receber-lista/contas-receber-lista.component';
import { FluxoCaixaListaComponent } from './components/fluxo-caixa-lista/fluxo-caixa-lista.component';
import { FinanceiroComponent } from './financeiro.component';

export default [
    {
        path: '',
        component: FinanceiroComponent
    },
    {
        path: 'contas-a-pagar',
        component: ContasPagarListaComponent
    },
    {
        path: 'contas-a-receber',
        component: ContasReceberListaComponent
    },
    {
        path: 'fluxo-de-caixa',
        component: FluxoCaixaListaComponent
    }
] as Route;
