import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { BaseDataService } from '../services/base-data.service';

@Component({
    selector: 'app-base-list',
    template: '',
    styles: []
})
export abstract class BaseListComponent<T, S> implements OnInit, OnDestroy {
    // Propriedades comuns
    titlePage = '';
    subTitlePage = '';
    rows: Observable<T[]> = new Observable<T[]>();
    count = 0;
    selected: any[] = [];
    SelectionType = SelectionType.checkbox;
    ColumnMode = ColumnMode.force;
    loadingIndicator = true;
    reorderable = true;

    // Referência ao componente de formulário
    formComponent: any;

    // Injeção de dependências genéricas
    protected dialog: MatDialog;

    // Serviço genérico tipado
    constructor(protected service: BaseDataService<T, S>) {
        this.dialog = inject(MatDialog);
    }

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        // Lógica de limpeza de inscrições
    }

    // Métodos abstratos que devem ser implementados
    abstract getColumns(): any[];
    abstract getFormComponent(): any;
    abstract getFilterPredicate(item: T, filter: string): boolean;

    // Métodos comuns implementados
    getAll(): void {
        this.loadingIndicator = true;
        this.service.getAll().subscribe((response: { items: T[]; count: number }) => {
            const { items, count } = response;
            this.updateRows(items);
            this.count = count;
            this.loadingIndicator = false;
        });
    }

    updateRows(rows: T[]): void {
        this.rows = new Observable((subscriber$: any) => {
            subscriber$.next(rows);
            subscriber$.complete();
        });
    }

    public deleteItem(id: number | string): void {
        this.service.delete(id).subscribe(() => {
            this.rows.subscribe((items: T[]) => {
                // Implementação genérica de filtragem
                this.updateRows(this.filterDeletedItem(items, id));
            });
        });
    }

    protected filterDeletedItem(items: T[], id: number | string): T[] {
        // Implementação genérica a ser sobrescrita se necessário
        return items.filter((item: any) => item.id !== id);
    }

    public editItem(item: T): void {
        const dialogRef = this.dialog.open(this.getFormComponent(), {
            data: { item }
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if (result?.updated) {
                this.getAll();
            }
        });
    }

    updateFilter(filter: any): void {
        if (filter.updated) {
            this.getAll();
        } else if (filter.buscar) {
            const val = filter.buscar.toLowerCase();
            this.rows.subscribe((items: T[]) => {
                const temp = items.filter((item: T) => this.getFilterPredicate(item, val));
                this.updateRows(temp);
            });
        } else {
            this.getAll();
        }
    }

    onSelect({ selected }: any): void {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }
}
