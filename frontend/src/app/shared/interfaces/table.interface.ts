import { TemplateRef } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

export interface TableConfig<T> {
    columns: {
        prop: keyof T | string;
        name: string;
        cellTemplate?: TemplateRef<any>;
        sortable?: boolean;
        width?: number;
    }[];
    selectionType?: SelectionType;
    columnMode?: ColumnMode;
    reorderable?: boolean;
    checkboxSelect?: boolean;
}
