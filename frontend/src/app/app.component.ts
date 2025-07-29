import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from './layout/service/title.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `<router-outlet />`
})
export class AppComponent {
    titlePage = 'Technofrio | Soluções em ar condicionado';
    constructor(private title: TitleService) {
        this.title.set(this.titlePage);
    }
}
