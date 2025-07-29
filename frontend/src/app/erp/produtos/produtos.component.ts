import { Component } from '@angular/core';
import { ProdutosListaComponent } from './components/produtos-lista/produtos-lista.component';

@Component({
    selector: 'app-produtos',
    imports: [ProdutosListaComponent],
    template: '<app-produtos-lista />'
})
export class ProdutosComponent {}
