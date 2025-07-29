import { Component } from '@angular/core';
import { OrdemServicoListaComponent } from './components/ordem-servico-lista/ordem-servico-lista.component';

@Component({
    selector: 'app-ordem-servico',
    imports: [OrdemServicoListaComponent],
    template: '<app-ordem-servico-lista />'
})
export class OrdemServicoComponent {}
