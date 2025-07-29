import { Component } from '@angular/core';
import { ContratosListaComponent } from './components/contratos-lista/contratos-lista.component';

@Component({
    selector: 'app-contratos',
    imports: [ContratosListaComponent],
    template: '<app-contratos-lista></app-contratos-lista>'
})
export class ContratosComponent {}
