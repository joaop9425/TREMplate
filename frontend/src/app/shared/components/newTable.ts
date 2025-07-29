import { CommonModule, NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared.module';

@Component({
    selector: 'app-generic-table',
    standalone: true,
    imports: [NgxDatatableModule, SharedModule, CommonModule],
    template: `
        <ngx-datatable
            #table
            class="material striped"
            [rows]="rows"
            [columns]="columns"
            [loadingIndicator]="loadingIndicator"
            [count]="count"
            [selected]="selected"
            [selectionType]="selectionType"
            [columnMode]="columnMode"
            [headerHeight]="50"
            [footerHeight]="50"
            [rowHeight]="'auto'"
            [reorderable]="reorderable"
            [limit]="10"
            (select)="onSelect.emit($event)"
            (activate)="onActivate.emit($event)"
        >
            <!-- <ngx-datatable-column *ngFor="let col of columns" [name]="col.name" [prop]="col.prop" [sortable]="false" [canAutoResize]="true" [resizeable]="true" [draggable]="true" [cellTemplate]="col.cellTemplate"> </ngx-datatable-column> -->
        </ngx-datatable>
    `
})
export class GenericTableComponent<T> {
    @Input() rows: T[] = [];
    @Input() columns: any[] = [];
    @Input() loadingIndicator = false;
    @Input() count = 0;
    @Input() selected: any[] = [];
    @Input() selectionType = SelectionType.checkbox;
    @Input() columnMode = ColumnMode.force;
    @Input() reorderable = true;

    @Output() onSelect = new EventEmitter<any>();
    @Output() onActivate = new EventEmitter<any>();
}
