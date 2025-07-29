import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../clientes/cliente.interface';

@Injectable({
    providedIn: 'root'
})
export class EnderecoService {
    private baseUrl = 'http://localhost:7096/api/addresses'; // Alterar conforme o backend

    constructor(private http: HttpClient) {}

    getAll(): Observable<{ clientes: Cliente[]; count: number }> {
        return this.http.get<{ clientes: Cliente[]; count: number }>(this.baseUrl);
    }

    getById(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.baseUrl}/id/${id}`);
    }

    getByName(name: string): Observable<{ clientes: Cliente[]; count: number }> {
        return this.http.get<{ clientes: Cliente[]; count: number }>(`${this.baseUrl}/filter?filter=${name}`);
    }

    getCidades() {
        return this.http.get<any[]>(`${this.baseUrl}/cities`);
    }

    getEstados() {
        return this.http.get<any[]>(`${this.baseUrl}/states`);
    }

    buscarCidadesPorEstado(estadoId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/cities/stateId?stateId=${estadoId}`);
    }

    buscarCep(cep: string) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
}
