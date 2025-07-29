import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { DatatableConfigComponent } from '../../../../shared/components/datatable';
import { FilterComponent } from '../../../../shared/components/filter';
import { FinanceiroService } from '../../../services/financeiro.service';
import { SharedModule } from '../../../../shared/shared.module';
import { ContasReceber } from '../../interfaces/contas-receber.model';
import { ContasReceberFormComponent } from '../contas-receber-form/contas-receber-form.component';

@Component({
    selector: 'app-contas-receber-lista',
    standalone: true,
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
                { prop: 'updated_at', name: 'Data recebimento' },
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
            <!-- <button mat-button type="button" (click)="editContasReceber(row)">Editar</button> -->
            <button mat-button type="button" (click)="updateStatus(row)">Recebido</button>
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
export class ContasReceberListaComponent {
    titlePage = 'Contas a Receber';
    subTitlePage = 'Filtro de contas a receber';

    rows: Observable<ContasReceber[]> = new Observable<ContasReceber[]>();
    count = 0;
    selected: any[] = [];
    SelectionType = SelectionType.checkbox;
    ColumnMode = ColumnMode.force;
    loadingIndicator = true;
    reorderable = true;
    @ViewChild(DatatableComponent) table!: DatatableComponent;

    component = ContasReceberFormComponent;

    readonly dialogContasReceberForm = inject(MatDialog);

    constructor(private financeiroService: FinanceiroService) {}

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        const subscription = this.rows.subscribe();
        if (subscription) subscription.unsubscribe();
    }

    getAll() {
        this.financeiroService.getAllContasReceber().subscribe((res: any) => {
            const { contasReceber, count } = res;
            this.updateRows(contasReceber);
            this.count = count;
            this.loadingIndicator = false;
        });
    }

    updateRows(rows: ContasReceber[]): void {
        this.rows = new Observable((subscriber$: any) => {
            subscriber$.next(rows);
            subscriber$.complete();
        });
    }

    editContasReceber(contasReceber: ContasReceber) {
        const dialogRef = this.dialogContasReceberForm.open(ContasReceberFormComponent, {
            data: {
                contasReceber
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result?.updated) {
                this.getAll();
            }
        });
    }

    updateStatus(contaReceber: ContasReceber) {
        this.financeiroService.updateContasReceberStatus(contaReceber.id!, contaReceber.status === 'pendente' ? 'recebido' : 'pendente').subscribe(() => {
            this.rows.subscribe((contasReceber: ContasReceber[]) => {
                const filteredContasReceber = contasReceber.map((c: ContasReceber) => {
                    if (c.id === contaReceber.id) {
                        c.status = contaReceber.status === 'pendente' ? 'recebido' : 'pendente';
                    }
                    return c;
                });
                this.updateRows(filteredContasReceber);
            });
        });
    }

    updateFilter(filter: any) {
        if (filter.updated) {
            this.getAll();
        } else if (filter.buscar) {
            const val = filter.buscar.toLowerCase();
            this.rows.subscribe((cr: ContasReceber[]) => {
                const temp = cr.filter((c: ContasReceber) => {
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
