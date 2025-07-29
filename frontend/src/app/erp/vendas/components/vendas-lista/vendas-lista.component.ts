import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { BaseListComponent } from '../../../../shared/components/base-list';
import { GenericFilterComponent } from '../../../../shared/components/newFilter';
import { GenericTableComponent } from '../../../../shared/components/newTable';
import { SharedModule } from '../../../../shared/shared.module';
import { VendasService } from '../../../services/vendas.service';
import { Venda } from '../../interface/venda.interface';
import { VendasFormComponent } from '../vendas-form/vendas-form.component';

@Component({
    selector: 'app-vendas-lista',
    imports: [AsyncPipe, SharedModule, GenericFilterComponent, GenericTableComponent],
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
    `,
    styles: [``]
})
export class VendasListaComponent extends BaseListComponent<Venda, VendasService> implements AfterViewInit {
    @ViewChild('actionsTemplate', { static: false }) actionsTemplate!: TemplateRef<any>;

    columns: any[] = [];

    ngAfterViewInit() {
        // Agora que a template foi inicializada
        this.columns = this.getColumns();
        this.cd.detectChanges();
    }

    constructor(
        servico: VendasService,
        private cd: ChangeDetectorRef
    ) {
        super(servico);
        this.titlePage = 'Vendas';
        this.subTitlePage = 'Filtro de vendas';
    }

    getColumns(): any[] {
        return [
            { prop: 'cliente.nome', name: 'Nome' },
            { prop: 'data', name: 'Data da venda' },
            { prop: 'valorTotal', name: 'Valor Total' },
            { prop: 'id', name: 'Ações', cellTemplate: this.actionsTemplate }
        ];
    }

    getFormComponent(): any {
        return VendasFormComponent;
    }

    getFilterPredicate(contrato: Venda, filter: string): boolean {
        // return contrato.cliente.nome.toLowerCase().indexOf(filter) !== -1 || contrato.descricao.toLowerCase().indexOf(filter) !== -1;
        return true;
    }

    onActivate(event: any) {
        // console.log('Activate Event', event);
    }
}
