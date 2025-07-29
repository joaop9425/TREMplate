import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { BaseListComponent } from '../../../../shared/components/base-list';
import { GenericFilterComponent } from '../../../../shared/components/newFilter';
import { GenericTableComponent } from '../../../../shared/components/newTable';
import { MaterialModule } from '../../../../shared/material.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ServicosService } from '../../../services/servicos.service';
import { Servico } from '../../interface/servico.interface';
import { ServicosFormComponent } from '../servicos-form/servicos-form.component';

@Component({
    selector: 'app-servicos-lista',
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
            <ng-template #currencyTemplate let-value="value">
                <p>R$ {{ value }}</p>
            </ng-template>
            <ng-template #actionsTemplate let-rowIndex="rowIndex" let-value="value" let-row="row">
                <button mat-button type="button" (click)="editItem(row)">Editar</button>
                <button mat-button type="button" (click)="deleteItem(value)">Excluir</button>
            </ng-template>
        </app-generic-table>
    `,
    styles: [``]
})
export class ServicosListaComponent extends BaseListComponent<Servico, ServicosService> implements AfterViewInit {
    @ViewChild('actionsTemplate', { static: false }) actionsTemplate!: TemplateRef<any>;
    @ViewChild('currencyTemplate', { static: false }) currencyTemplate!: TemplateRef<any>;

    columns: any[] = [];

    ngAfterViewInit() {
        // Agora que a template foi inicializada
        this.columns = this.getColumns();
        this.cd.detectChanges();
    }

    constructor(
        servico: ServicosService,
        private cd: ChangeDetectorRef
    ) {
        super(servico);
        this.titlePage = 'Serviços';
        this.subTitlePage = 'Filtro de serviços';
    }

    getColumns(): any[] {
        return [
            { prop: 'nome', name: 'Nome' },
            { prop: 'descricao', name: 'Descrição' },
            { prop: 'valor', name: 'Preço', cellTemplate: this.currencyTemplate },
            { prop: 'id', name: 'Ações', cellTemplate: this.actionsTemplate }
        ];
    }

    getFormComponent(): any {
        return ServicosFormComponent;
    }

    getFilterPredicate(contrato: Servico, filter: string): boolean {
        // return contrato.cliente.nome.toLowerCase().indexOf(filter) !== -1 || contrato.descricao.toLowerCase().indexOf(filter) !== -1;
        return true;
    }

    onActivate(event: any) {
        // console.log('Activate Event', event);
    }
}
