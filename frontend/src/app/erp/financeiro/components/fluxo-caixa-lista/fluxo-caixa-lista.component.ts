import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { DatatableConfigComponent } from '../../../../shared/components/datatable';
import { SharedModule } from '../../../../shared/shared.module';
import { FinanceiroService } from '../../../services/financeiro.service';
import { FluxoCaixa } from '../../interfaces/fluxo-caixa.model';

@Component({
    selector: 'app-fluxo-caixa-lista',
    imports: [SharedModule, DatatableConfigComponent, CommonModule],
    template: `
        <h2>Fluxo de Caixa</h2>
        <app-datatable-config
            class="material striped"
            [rows]="(rows | async) || []"
            [columns]="[
                {
                    checkboxable: true,
                    headerCheckboxable: true,
                    width: 30,
                    sortable: false,
                    canAutoResize: false,
                    draggable: false,
                    resizeable: false
                },
                { prop: 'descricao', name: 'Descrição' },
                { prop: 'valor', name: 'Valor' },
                { prop: 'created_at', name: 'Data cadastro' },
                { prop: 'updated_at', name: 'Data recebimento' },
                { prop: 'status', name: 'Status' }
            ]"
            [loadingIndicator]="loadingIndicator"
            [count]="count"
            [selected]="selected"
            [ColumnMode]="ColumnMode"
            [SelectionType]="SelectionType"
            [checkboxSelect]="false"
            [reorderable]="reorderable"
        >
        </app-datatable-config>
        <!-- { prop: 'id', name: 'Ações', cellTemplate: actionsTemplate } -->

        <ng-template #actionsTemplate let-rowIndex="rowIndex" let-value="value" let-row="row">
            <!-- <button mat-button type="button" (click)="editContasReceber(row)">Editar</button> -->
            <!-- <button mat-button type="button" (click)="updateStatus(row)">Recebido</button> -->
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ]
})
export class FluxoCaixaListaComponent {
    titlePage = 'Fluxo de caixa';

    rows: Observable<FluxoCaixa[]> = new Observable<FluxoCaixa[]>();
    count = 0;
    selected: any[] = [];
    SelectionType = SelectionType.checkbox;
    ColumnMode = ColumnMode.force;
    loadingIndicator = true;
    reorderable = true;
    @ViewChild(DatatableComponent) table!: DatatableComponent;

    constructor(private financeiroService: FinanceiroService) {}

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        const subscription = this.rows.subscribe();
        if (subscription) subscription.unsubscribe();
    }

    getAll() {
        this.financeiroService.getAllFluxoCaixa().subscribe((res: any) => {
            const { contasPagar, contasReceber, count } = res;
            this.updateRows(contasPagar.contasPagar.concat(contasReceber.contasReceber));
            this.count = count;
            this.loadingIndicator = false;
        });
    }

    updateRows(rows: FluxoCaixa[]): void {
        this.rows = new Observable((subscriber$: any) => {
            subscriber$.next(rows);
            subscriber$.complete();
        });
    }

    updateFilter(filter: any) {
        if (filter.updated) {
            this.getAll();
        } else if (filter.buscar) {
            const val = filter.buscar.toLowerCase();
            this.rows.subscribe((cr: FluxoCaixa[]) => {
                const temp = cr.filter((c: FluxoCaixa) => {
                    return c.descricao.toLowerCase().indexOf(val) !== -1 || c.descricao.toLowerCase().indexOf(val) !== -1;
                });

                this.updateRows(temp);
            });
        } else if (!filter.buscar || filter.buscar !== '') {
            this.getAll();
        }
    }

    onSelect({ selected }: any) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event: any) {
        console.log('Activate Event', event);
    }
}
