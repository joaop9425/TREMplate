import { Component, Input } from '@angular/core';
import { ColumnMode, NgxDatatableModule, SelectionType, TableColumn } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-datatable-config',
    standalone: true,
    imports: [NgxDatatableModule],
    template: `
        <ngx-datatable
            #table
            class="material"
            [rows]="rows"
            [columns]="columns"
            [loadingIndicator]="loadingIndicator"
            [reorderable]="reorderable"
            [count]="count"
            [selected]="selected"
            [columnMode]="ColumnMode"
            [selectionType]="SelectionType"
            [headerHeight]="50"
            [footerHeight]="50"
            rowHeight="auto"
            [limit]="10"
            [selectAllRowsOnPage]="false"
            (activate)="onActivate($event)"
            (select)="onSelect($event)"
        >
        </ngx-datatable>
    `
})
export class DatatableConfigComponent {
    @Input() rows: unknown[] = [];
    @Input() columns: TableColumn[] = [];
    @Input() loadingIndicator = true;
    @Input() reorderable = true;
    @Input() count = 0;
    @Input() selected: unknown[] = [];
    @Input() ColumnMode = ColumnMode.force;
    @Input() SelectionType = SelectionType.checkbox;
    @Input() checkboxSelect = true;

    onActivate(_event: unknown) {
        // Handle activate event
        // console.log(event);
    }

    onSelect(_event: unknown) {
        // Handle select event
        // console.log(event);
    }

    onPageChange(_event: unknown) {
        // Handle page change event
        // console.log(event);
    }
}
