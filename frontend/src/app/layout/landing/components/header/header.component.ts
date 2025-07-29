import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

import { LogoComponent } from '../logo/logo.component';

@Component({
    selector: 'app-header',
    imports: [NgIf, LogoComponent, StyleClassModule, ButtonModule, RippleModule],
    template: `
        <header class="relative">
            <div class="nav flex items-center justify-between w-full px-4 lg:px-12">
                <!-- Logo e Nome -->
                <a class="flex items-center cursor-pointer" (click)="router.navigate([''])">
                    <app-logo></app-logo>
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20"> Technofrio </span>
                </a>

                <!-- Botão Hamburguer (Mobile) -->
                <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:!hidden" (click)="toggleMenu()">
                    <i class="pi pi-bars !text-2xl"></i>
                </a>

                <!-- Menu Navegação Desktop -->
                <ul class="hidden lg:flex list-none p-0 m-0 flex-row items-center gap-8">
                    <li>
                        <a (click)="router.navigate(['/'], { fragment: 'principal' })" pRipple class="menu-item px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Principal</span>
                        </a>
                    </li>
                    <li>
                        <a (click)="router.navigate(['/'], { fragment: 'servicos' })" pRipple class="menu-item px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Serviços</span>
                        </a>
                    </li>
                    <!-- <li>
                        <a (click)="router.navigate(['/'], { fragment: 'clientes' })" pRipple class="menu-item px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Clientes</span>
                        </a>
                    </li> -->
                    <li>
                        <a (click)="router.navigate(['/contato'])" pRipple class="menu-item px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Contatos</span>
                        </a>
                    </li>
                    <li>
                        <a (click)="router.navigate(['/sobre'])" pRipple class="menu-item px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Sobre a Technofrio</span>
                        </a>
                    </li>
                    <li>
                        <a (click)="router.navigate(['/sistema'])" pRipple class="menu-item px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Acessar sistema</span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Menu Responsivo (Aparece abaixo do .nav quando aberto) -->
            <div *ngIf="menuAberto" class="lg:hidden w-full bg-white dark:bg-gray-900 shadow-md absolute top-full left-0 z-50">
                <ul class="list-none p-4 flex flex-col gap-4">
                    <li>
                        <a (click)="router.navigate(['/'], { fragment: 'principal' }); toggleMenu()" pRipple class="block text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Principal</span>
                        </a>
                    </li>
                    <li>
                        <a (click)="router.navigate(['/'], { fragment: 'servicos' }); toggleMenu()" pRipple class="block text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Serviços</span>
                        </a>
                    </li>
                    <!-- <li>
                        <a (click)="router.navigate(['/'], { fragment: 'clientes' }); toggleMenu()" pRipple class="block text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Clientes</span>
                        </a>
                    </li> -->
                    <li>
                        <a (click)="router.navigate(['/contato']); toggleMenu()" pRipple class="block text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Contatos</span>
                        </a>
                    </li>
                    <li>
                        <a (click)="router.navigate(['/sobre']); toggleMenu()" pRipple class="block text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Sobre a Technofrio</span>
                        </a>
                    </li>
                    <li>
                        <a (click)="router.navigate(['/sistema']); toggleMenu()" pRipple class="block text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer">
                            <span>Acessar sistema</span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    `,
    styles: `
        app-logo {
            height: 100px;
            width: 155px;
            display: flex;
        }

        .nav {
            align-items: center;
        }

        ul {
            display: flex;
            align-items: center;
        }

        .menu-item {
            display: none;
        }

        @media (min-width: 1024px) {
            .menu-item {
                display: block;
            }
        }
    `
})
export class HeaderComponent {
    menuAberto = false;

    constructor(public router: Router) {}

    toggleMenu() {
        this.menuAberto = !this.menuAberto;
    }
}
