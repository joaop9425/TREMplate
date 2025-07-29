import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ServicosComponent } from './components/servicos/servicos.component';

@Component({
    selector: 'app-layout-landing',
    imports: [NgIf, RouterOutlet, HeaderComponent, FooterComponent, PrincipalComponent, ServicosComponent],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
            <div id="principal" class="landing-wrapper overflow-hidden">
                <div class="sticky-header">
                    <app-header />
                </div>
                <main class="content-wrapper overflow-hidden">
                    <!-- Exibe os componentes apenas se não estiver nas rotas /contato ou /sobre -->
                    <ng-container *ngIf="!isContatoOrSobre()">
                        <app-principal />
                        <app-servicos />
                        <!-- <app-clientes /> -->
                    </ng-container>
                    <ng-container *ngIf="isContatoOrSobre()">
                        <router-outlet />
                    </ng-container>
                </main>
                <app-footer class="footer" />
            </div>
        </div>
    `,
    styles: `
        .page-wrapper {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .sticky-header {
            flex-grow: 0;
            min-height: 60px; /* whatever you want it to be */
        }

        .content-wrapper {
            flex-grow: 1;
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
        }

        .content {
            flex-grow: 1;
        }

        .footer {
            min-height: 60px; /* whatever you want it to be */
            flex-grow: 0;
        }
    `
})
export class LayoutLandingComponent {
    constructor(private router: Router) {}

    isContatoOrSobre(): boolean {
        const currentRoute = this.router.url;
        return currentRoute.includes('/contato') || currentRoute.includes('/sobre');
    }
}
