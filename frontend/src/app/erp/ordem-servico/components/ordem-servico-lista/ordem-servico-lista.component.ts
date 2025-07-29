import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { BaseListComponent } from '../../../../shared/components/base-list';
import { GenericFilterComponent } from '../../../../shared/components/newFilter';
import { GenericTableComponent } from '../../../../shared/components/newTable';
import { MaterialModule } from '../../../../shared/material.module';
import { OrdemServicoService } from '../../../services/ordem-servico.service';
import { SharedModule } from '../../../../shared/shared.module';
import { OrdemServico } from '../../interface/ordem-servico.interface';
import { OrdemServicoFormComponent } from '../ordem-servico-form/ordem-servico-form.component';

@Component({
    selector: 'app-ordem-servico-lista',
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
export class OrdemServicoListaComponent extends BaseListComponent<OrdemServico, any> implements AfterViewInit {
    @ViewChild('actionsTemplate', { static: false }) actionsTemplate!: TemplateRef<any>;

    columns: any[] = [];

    ngAfterViewInit() {
        // Agora que a template foi inicializada
        this.columns = this.getColumns();
        this.cd.detectChanges();
    }

    constructor(
        ordemServicoService: OrdemServicoService,
        private cd: ChangeDetectorRef
    ) {
        super(ordemServicoService);
        this.titlePage = 'Ordem de Serviço';
        this.subTitlePage = 'Filtro de ordem de serviço';
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
        return OrdemServicoFormComponent;
    }

    getFilterPredicate(contrato: OrdemServico, filter: string): boolean {
        // return contrato.cliente.nome.toLowerCase().indexOf(filter) !== -1 || contrato.descricao.toLowerCase().indexOf(filter) !== -1;
        return true;
    }

    onActivate(event: any) {
        // console.log('Activate Event', event);
    }
}
