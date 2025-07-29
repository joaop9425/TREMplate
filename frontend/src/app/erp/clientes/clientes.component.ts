import { Component } from '@angular/core';
import { ClientesListaComponent } from './components/clientes-lista/clientes-lista.component';

@Component({
    selector: 'app-clientes',
    imports: [ClientesListaComponent],
    template: '<app-clientes-lista></app-clientes-lista>'
})
export class ClientesComponent {}
