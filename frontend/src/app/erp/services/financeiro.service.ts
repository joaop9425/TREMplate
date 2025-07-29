import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContasPagar } from '../financeiro/interfaces/contas-pagar.model';
import { ContasReceber } from '../financeiro/interfaces/contas-receber.model';
import { FluxoCaixa } from '../financeiro/interfaces/fluxo-caixa.model';

@Injectable({
    providedIn: 'root'
})
export class FinanceiroService {
    private readonly baseUrl = 'http://localhost:7096/api/financeiro';

    constructor(private http: HttpClient) {}

    // Fluxo de Caixa
    getAllFluxoCaixa(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/fluxo-caixa`);
    }

    createFluxoCaixa(data: FluxoCaixa): Observable<FluxoCaixa> {
        return this.http.post<FluxoCaixa>(`${this.baseUrl}/fluxo-caixa`, data);
    }

    // Contas a Pagar
    getAllContasPagar(): Observable<ContasPagar[]> {
        return this.http.get<ContasPagar[]>(`${this.baseUrl}/contas-pagar`);
    }

    createContasPagar(data: ContasPagar): Observable<ContasPagar> {
        return this.http.post<ContasPagar>(`${this.baseUrl}/contas-pagar`, data);
    }

    updateContasPagarStatus(id: number, status: 'pendente' | 'pago'): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/contas-pagar/${id}`, { status });
    }

    // Contas a Receber
    getAllContasReceber(): Observable<ContasReceber[]> {
        return this.http.get<ContasReceber[]>(`${this.baseUrl}/contas-receber`);
    }

    createContasReceber(data: ContasReceber): Observable<ContasReceber> {
        return this.http.post<ContasReceber>(`${this.baseUrl}/contas-receber`, data);
    }

    updateContasReceberStatus(id: number, status: 'pendente' | 'recebido'): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/contas-receber/${id}`, { status });
    }
}
