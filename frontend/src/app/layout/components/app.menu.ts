import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/sistema/dashboard'] }]
            },
            {
                label: 'Modulos',
                items: [
                    {
                        label: 'Clientes',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/sistema/clientes']
                    },
                    {
                        label: 'Contratos',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/sistema/contratos']
                    },
                    {
                        label: 'Financeiro',
                        icon: 'pi pi-fw pi-dollar',
                        items: [
                            {
                                label: 'Contas a Pagar',
                                icon: 'pi pi-fw pi-money-bill',
                                routerLink: ['/sistema/financeiro/contas-a-pagar']
                            },
                            {
                                label: 'Contas a Receber',
                                icon: 'pi pi-fw pi-receipt',
                                routerLink: ['/sistema/financeiro/contas-a-receber']
                            },
                            {
                                label: 'Fluxo de Caixa',
                                icon: 'pi pi-fw pi-shopping-cart',
                                routerLink: ['/sistema/financeiro/fluxo-de-caixa']
                            }
                        ]
                    },
                    {
                        label: 'Ordem de Serviço',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/sistema/ordem-servico']
                    },
                    {
                        label: 'Produtos',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/sistema/produtos']
                    },
                    {
                        label: 'Serviços',
                        icon: 'pi pi-fw pi-wrench',
                        routerLink: ['/sistema/servicos']
                    },
                    {
                        label: 'Vendas',
                        icon: 'pi pi-fw pi-shop',
                        routerLink: ['/sistema/vendas']
                    }
                ]
            }
        ];
    }
}
