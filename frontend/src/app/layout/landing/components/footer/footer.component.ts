import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
    selector: 'app-footer',
    imports: [LogoComponent, RouterModule],
    template: `
        <footer>
            <app-logo (click)="router.navigate([''])"></app-logo>
            <div class="footer-content">
                <p>© 2023 Landing. Todos os direitos reservados.</p>
                <div class="footer-navigation">
                    <nav>
                        <a (click)="router.navigate(['contato'])" class="cursor-pointer">Contatos</a>
                        <a (click)="router.navigate(['sobre'])" class="cursor-pointer">Sobre nós</a>
                    </nav>
                    <div class="social-media">
                        <div class="cursor-pointer">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                                ><span><i class="pi pi-instagram"></i> Instagram</span></a
                            >
                        </div>
                        <div class="cursor-pointer">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
                                ><span><i class="pi pi-facebook"></i> Facebook</span></a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `,
    styles: `
        footer {
            padding: 2rem 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .footer-content {
            max-width: 1200px;
            width: 100%;
            padding: 0 1rem;
        }

        .footer-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
        }

        nav a {
            text-decoration: none;
        }

        .social-media {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }

        i {
            font-size: 1.2rem;
        }
    `
})
export class FooterComponent {
    constructor(public router: Router) {}
}
