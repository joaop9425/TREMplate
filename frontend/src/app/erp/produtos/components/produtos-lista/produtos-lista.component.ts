import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { BaseListComponent } from '../../../../shared/components/base-list';
import { GenericFilterComponent } from '../../../../shared/components/newFilter';
import { GenericTableComponent } from '../../../../shared/components/newTable';
import { MaterialModule } from '../../../../shared/material.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../interface/produto.interface';
import { ProdutosFormComponent } from '../produtos-form/produtos-form.component';

@Component({
    selector: 'app-produtos-lista',
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
    `,
    styles: [``]
})
export class ProdutosListaComponent extends BaseListComponent<Produto, ProdutosService> implements AfterViewInit {
    @ViewChild('actionsTemplate', { static: false }) actionsTemplate!: TemplateRef<any>;

    columns: any[] = [];

    ngAfterViewInit() {
        // Agora que a template foi inicializada
        this.columns = this.getColumns();
        this.cd.detectChanges();
    }

    constructor(
        servico: ProdutosService,
        private cd: ChangeDetectorRef
    ) {
        super(servico);
        this.titlePage = 'Produtos';
        this.subTitlePage = 'Filtro de produtos';
    }

    getColumns(): any[] {
        // console.log(this.actionsTemplate);
        return [
            { prop: 'nome', name: 'Nome' },
            { prop: 'descricao', name: 'Descrição' },
            { prop: 'id', name: 'Ações', cellTemplate: this.actionsTemplate }
        ];
    }

    getFormComponent(): any {
        return ProdutosFormComponent;
    }

    getFilterPredicate(contrato: Produto, filter: string): boolean {
        // return contrato.cliente.nome.toLowerCase().indexOf(filter) !== -1 || contrato.descricao.toLowerCase().indexOf(filter) !== -1;
        return true;
    }

    onActivate(event: any) {
        // console.log('Activate Event', event);
    }
}
