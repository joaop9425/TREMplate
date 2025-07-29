import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IBaseService<T> {
    baseUrl: string;
    create(item: Partial<T>): Observable<T>;
    getAll(): Observable<[T[], number]>;
    getById(id: number): Observable<T>;
    update(id: number, item: Partial<T>): Observable<T>;
    delete(id: number): Observable<void>;
}

@Injectable({
    providedIn: 'root'
})
export class BaseService<T> implements IBaseService<T> {
    baseUrl: string;
    resourceUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(String) resourceUrl: string
    ) {
        this.resourceUrl = resourceUrl;
        this.baseUrl = `http://localhost:7096/api/${resourceUrl}`;
    }

    create(item: Partial<T>): Observable<T> {
        return this.http.post<T>(this.baseUrl, item);
    }

    getAll(): Observable<[T[], number]> {
        return this.http.get<[T[], number]>(this.baseUrl);
    }

    getById(id: number): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/id/${id}`);
    }

    getByFilter(queryParam: any): Observable<[T[], number]> {
        return this.http.get<[T[], number]>(`${this.baseUrl}/filtro?${queryParam}`);
    }

    update(id: number, item: Partial<T>): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${id}`, item);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
