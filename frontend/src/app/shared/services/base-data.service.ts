import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseDataService<T, S> {
    protected abstract apiUrl: string;
    private apiBase = 'http://localhost:7096';

    constructor(protected http: HttpClient) {}

    getAll(params?: S): Observable<{ items: T[]; count: number }> {
        return this.http.get<{ items: T[]; count: number }>(`${this.apiBase}/${this.apiUrl}`, { params: params as any });
    }

    getById(id: number | string): Observable<T> {
        return this.http.get<T>(`${this.apiBase}/${this.apiUrl}/${id}`);
    }

    create(item: Partial<T>): Observable<T> {
        return this.http.post<T>(`${this.apiBase}/${this.apiUrl}`, item);
    }

    update(id: number | string, item: Partial<T>): Observable<T> {
        return this.http.put<T>(`${this.apiBase}/${this.apiUrl}/${id}`, item);
    }

    delete(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.apiBase}/${this.apiUrl}/${id}`);
    }

    // Métodos adicionais para operações em lote, etc.
}
