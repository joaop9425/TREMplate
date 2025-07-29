import { Component } from '@angular/core';

@Component({
    selector: 'app-servicos',
    imports: [],
    template: `
        <div id="servicos">
            <div class="grid grid-cols-12 gap-6 justify-center mt-10">
                <!-- Card: Instalação -->
                <div class="col-span-12 lg:col-span-4 card">
                    <div class="flex items-center justify-center bg-slate-200 rounded-md w-14 h-14 mb-4">
                        <i class="pi pi-fw pi-cog text-2xl text-slate-700"></i>
                    </div>
                    <h5 class="text-surface-900 dark:text-surface-0 mb-2">Instalação</h5>
                    <p class="text-surface-600 dark:text-surface-200">Realizamos instalação de equipamentos elétricos com segurança e eficiência.</p>
                </div>
                <!-- Card: Manutenção -->
                <div class="col-span-12 lg:col-span-4 card">
                    <div class="flex items-center justify-center bg-slate-200 rounded-md w-14 h-14 mb-4">
                        <i class="pi pi-fw pi-wrench text-2xl text-slate-700"></i>
                    </div>
                    <h5 class="text-surface-900 dark:text-surface-0 mb-2">Manutenção</h5>
                    <p class="text-surface-600 dark:text-surface-200">Oferecemos manutenção preventiva e corretiva para seus equipamentos.</p>
                </div>
                <!-- Card: Higienização -->
                <div class="col-span-12 lg:col-span-4 card">
                    <div class="flex items-center justify-center bg-slate-200 rounded-md w-14 h-14 mb-4">
                        <i class="pi pi-fw pi-refresh text-2xl text-slate-700"></i>
                    </div>
                    <h5 class="text-surface-900 dark:text-surface-0 mb-2">Higienização</h5>
                    <p class="text-surface-600 dark:text-surface-200">Serviço de higienização para garantir o bom funcionamento dos equipamentos.</p>
                </div>
            </div>
        </div>
    `,
    styles: `
        .card {
            transition:
                transform 0.3s,
                box-shadow 0.3s;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }
    `
})
export class ServicosComponent {}
