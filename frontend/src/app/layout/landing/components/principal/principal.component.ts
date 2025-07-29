import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
    selector: 'app-principal',
    imports: [LogoComponent],
    template: `
        <div
            id="principal"
            class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
            style="background: linear-gradient(0deg, rgb(0, 74, 173), rgb(37, 150, 190)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(37, 150, 190) 0%, rgb(0, 74, 173) 100%);"
        >
            <div class="company-info mx-6 md:mx-20 mt-0 md:mt-6">
                <h1 class="text-6xl font-bold text-gray-900 leading-tight" style="text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);">Technofrio</h1>
                <p class="font-normal text-2xl text-justify leading-normal md:mt-4 text-white">Aliando qualidade e preço justo em instalação e manutenção de ar condicionado residencial e comercial.</p>
            </div>
            <div class="logo-container flex justify-center md:justify-end">
                <app-logo />
            </div>
        </div>
    `,
    styles: `
        #principal {
            text-align: center;
            padding: 20px;
        }
        .logo-container {
            margin-bottom: 20px;
        }
        .logo {
            max-width: 100%;
            height: auto;
        }
        @media (max-width: 768px) {
            .company-info h1 {
                font-size: 1.5rem;
            }
            .company-info p {
                font-size: 1rem;
            }
        }
    `
})
export class PrincipalComponent {}
