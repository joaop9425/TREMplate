import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { BaseListComponent } from '../../../../shared/components/base-list';
import { GenericFilterComponent } from '../../../../shared/components/newFilter';
import { GenericTableComponent } from '../../../../shared/components/newTable';
import { MaterialModule } from '../../../../shared/material.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ContratosService } from '../../../services/contrato.service';
import { Contrato } from '../../interface/contrato.interface';
import { ContratosFormComponent } from '../contratos-form/contratos-form.component';

@Component({
    selector: 'app-contratos-lista',
    standalone: true,
    imports: [MaterialModule, AsyncPipe, SharedModule, GenericFilterComponent, GenericTableComponent],
    template: `
        <app-generic-filter [titlePage]="titlePage" [subTitlePage]="subTitlePage" [formComponent]="getFormComponent()" (filter)="updateFilter($event)"> </app-generic-filter>

        <app-generic-table
            [rows]="(rows | async) || []"
            [columns]="this.columns"
            [loadingIndicator]="loadingIndicator"
            [count]="count"
            [selected]="selected"
            [selectionType]="SelectionType"
            [columnMode]="ColumnMode"
            [reorderable]="reorderable"
            (onSelect)="onSelect($event)"
            (onActivate)="onActivate($event)"
        >
            <ng-template #actionsTemplate let-rowIndex="rowIndex" let-value="value" let-row="row">
                <button mat-button type="button" (click)="editItem(row)">Editar</button>
                <button mat-button type="button" (click)="deleteItem(value)">Excluir</button>
            </ng-template>
        </app-generic-table>
    `
})
export class ContratosListaComponent extends BaseListComponent<Contrato, any> implements AfterViewInit {
    @ViewChild('actionsTemplate', { static: false }) actionsTemplate!: TemplateRef<any>;

    columns: any[] = [];

    ngAfterViewInit() {
        this.columns = this.getColumns();
        this.cd.detectChanges();
    }

    constructor(
        service: ContratosService,
        private cd: ChangeDetectorRef
    ) {
        super(service);
        this.titlePage = 'Contratos';
        this.subTitlePage = 'Filtro de contratos';
    }

    getColumns(): any[] {
        // console.log(this.actionsTemplate);
        return [
            { prop: 'cliente.nome', name: 'Cliente' },
            { prop: 'descricao', name: 'Descrição' },
            { prop: 'id', name: 'Ações', cellTemplate: this.actionsTemplate }
        ];
    }

    getFormComponent(): any {
        return ContratosFormComponent;
    }

    getFilterPredicate(contrato: Contrato, filter: string): boolean {
        return contrato.cliente.nome!.toLowerCase().indexOf(filter) !== -1 || contrato.descricao.toLowerCase().indexOf(filter) !== -1;
    }

    onActivate(event: any) {
        // console.log('Activate Event', event);
    }
}
