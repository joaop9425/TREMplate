import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { MatNativeDateModule } from '@angular/material/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(
            withFetch(),
            withInterceptors([
                // interceptors
            ])
        ),
        provideAnimationsAsync(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        importProvidersFrom(MatNativeDateModule)
    ]
};
