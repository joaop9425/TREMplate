import { Component } from '@angular/core';
import { VendasListaComponent } from './components/vendas-lista/vendas-lista.component';

@Component({
    selector: 'app-vendas',
    imports: [VendasListaComponent],
    template: '<app-vendas-lista />'
})
export class VendasComponent {}
