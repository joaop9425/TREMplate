import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = localStorage.getItem('access_token');

        if (!token) {
            // Se não tem token, manda pra página de login
            return this.router.parseUrl('/auth');
        }

        // Token existe, segue o baile
        return true;
    }
}
