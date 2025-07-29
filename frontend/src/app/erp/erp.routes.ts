import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ContratosComponent } from './contratos/contratos.component';
import { LayoutERPComponent } from './layout.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ServicosComponent } from './servicos/servicos.component';
import { VendasComponent } from './vendas/vendas.component';

const title = 'Technofrio | Sistema';

export default [
    {
        path: '',
        component: LayoutERPComponent,
        title,
        children: [
            {
                path: 'dashboard',
                component: PrincipalComponent,
                title: title + ' | Dashboard'
            },
            {
                path: 'clientes',
                component: ClientesComponent,
                title: title + ' | Clientes'
            },
            {
                path: 'contratos',
                component: ContratosComponent,
                title: title + ' | Contratos'
            },
            {
                path: 'financeiro',
                loadChildren: () => import('./financeiro/financeiro.routes'),
                title: title + ' | Financeiro'
            },
            {
                path: 'ordem-servico',
                component: OrdemServicoComponent,
                title: title + ' | Ordem de Serviço'
            },
            {
                path: 'produtos',
                component: ProdutosComponent,
                title: title + ' | Produtos'
            },
            {
                path: 'servicos',
                component: ServicosComponent,
                title: title + ' | Serviços'
            },
            {
                path: 'vendas',
                component: VendasComponent,
                title: title + ' | Vendas'
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    }
] as Routes;
