import { Component } from '@angular/core';
import { ServicosListaComponent } from './components/servicos-lista/servicos-lista.component';

@Component({
    selector: 'app-servicos',
    imports: [ServicosListaComponent],
    template: '<app-servicos-lista />'
})
export class ServicosComponent {}
