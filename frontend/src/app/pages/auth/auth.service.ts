import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:7096/api/authentication';

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post(`${this.apiUrl}/login`, { email, password });
    }

    refresh(userId: number, refreshToken: string) {
        return this.http.post(`${this.apiUrl}/refresh`, { userId, refreshToken });
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        // opcional: decodifica e verifica se expirou
        return !!token;
    }
}
