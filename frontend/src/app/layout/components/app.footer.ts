import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Sistema desenvolvidor por
        <a href="https://wa.me/5534992829236?text=Olá,%0ATenho interesse em..." target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">JP</a>
    </div>`
})
export class AppFooter {}
