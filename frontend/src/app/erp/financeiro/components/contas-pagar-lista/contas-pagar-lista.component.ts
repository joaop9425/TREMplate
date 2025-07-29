import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { DatatableConfigComponent } from '../../../../shared/components/datatable';
import { FilterComponent } from '../../../../shared/components/filter';
import { FinanceiroService } from '../../../services/financeiro.service';
import { SharedModule } from '../../../../shared/shared.module';
import { ContasPagar } from '../../interfaces/contas-pagar.model';
import { ContasPagarFormComponent } from '../contas-pagar-form/contas-pagar-form.component';

@Component({
    selector: 'app-contas-pagar-lista',
    imports: [FilterComponent, DatatableConfigComponent, CommonModule, SharedModule],
    template: `
        <app-filter [titlePage]="titlePage" [subTitlePage]="subTitlePage" [formComponent]="component" (filter)="updateFilter($event)"></app-filter>

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
                { prop: 'updated_at', name: 'Data pagamento' },
                { prop: 'status', name: 'Status' },
                { prop: 'id', name: 'Ações', cellTemplate: actionsTemplate }
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

        <ng-template #actionsTemplate let-rowIndex="rowIndex" let-value="value" let-row="row">
            <!-- <button mat-button type="button" (click)="editContasPagar(row)">Editar</button> -->
            <button mat-button type="button" (click)="updateStatus(row)">Pago</button>
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
export class ContasPagarListaComponent {
    titlePage = 'Contas a Pagar';
    subTitlePage = 'Filtro de contas a pagar';

    rows: Observable<ContasPagar[]> = new Observable<ContasPagar[]>();
    count = 0;
    selected: any[] = [];
    SelectionType = SelectionType.checkbox;
    ColumnMode = ColumnMode.force;
    loadingIndicator = true;
    reorderable = true;
    @ViewChild(DatatableComponent) table!: DatatableComponent;

    component = ContasPagarFormComponent;

    readonly dialogContasPagarForm = inject(MatDialog);

    constructor(private financeiroService: FinanceiroService) {}

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        const subscription = this.rows.subscribe();
        if (subscription) subscription.unsubscribe();
    }

    getAll() {
        this.financeiroService.getAllContasPagar().subscribe((clientesReq: any) => {
            const { contasPagar, count } = clientesReq;
            this.updateRows(contasPagar);
            this.count = count;
            this.loadingIndicator = false;
        });
    }

    updateRows(rows: ContasPagar[]): void {
        this.rows = new Observable((subscriber$: any) => {
            subscriber$.next(rows);
            subscriber$.complete();
        });
    }

    editContasPagar(contasPagar: ContasPagar) {
        const dialogRef = this.dialogContasPagarForm.open(ContasPagarFormComponent, {
            data: {
                contasPagar
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result?.updated) {
                this.getAll();
            }
        });
    }

    updateStatus(contaPagar: ContasPagar) {
        this.financeiroService.updateContasPagarStatus(contaPagar.id!, contaPagar.status === 'pendente' ? 'pago' : 'pendente').subscribe(() => {
            this.rows.subscribe((contasPagar: ContasPagar[]) => {
                const filteredContasPagar = contasPagar.map((c: ContasPagar) => {
                    if (c.id === contaPagar.id) {
                        c.status = contaPagar.status === 'pendente' ? 'pago' : 'pendente';
                    }
                    return c;
                });
                this.updateRows(filteredContasPagar);
            });
        });
    }

    updateFilter(filter: any) {
        if (filter.updated) {
            this.getAll();
        } else if (filter.buscar) {
            const val = filter.buscar.toLowerCase();
            this.rows.subscribe((cp: ContasPagar[]) => {
                const temp = cp.filter((c: ContasPagar) => {
                    return c.descricao.toLowerCase().indexOf(val) !== -1 || c.status.toLowerCase().indexOf(val) !== -1;
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
