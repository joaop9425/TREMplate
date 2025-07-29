import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientesComponent } from './layout/landing/components/clientes/clientes.component';
import { ServicosComponent } from './layout/landing/components/servicos/servicos.component';
import { LayoutLandingComponent } from './layout/landing/layout.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { Notfound } from './pages/notfound/notfound';
import { SobreComponent } from './pages/sobre/sobre.component';
import { AuthGuard } from './shared/guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutLandingComponent,
        children: [
            {
                path: '',
                component: AppComponent
            },
            {
                path: 'contato',
                component: ContatosComponent
            },
            {
                path: 'sobre',
                component: SobreComponent
            },
            {
                path: 'servicos',
                component: ServicosComponent
            },
            {
                path: 'clientes',
                component: ClientesComponent
            }
        ]
    },
    {
        path: 'sistema',
        loadChildren: () => import('./erp/erp.routes'),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes')
    },
    {
        path: 'notfound',
        component: Notfound
    },
    {
        path: '**',
        redirectTo: '/notfound'
    }
];
