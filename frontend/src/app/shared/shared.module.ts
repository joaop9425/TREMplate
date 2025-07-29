import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { INgxDatatableConfig, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from './material.module';
import { MaskPipe } from './pipes/mask.pipe';
import { NormalizeStringPipe } from './pipes/normalize-string.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PopoverModule } from 'primeng/popover';

const dataTableConfig: INgxDatatableConfig = {
    messages: {
        emptyMessage: 'Nenhum registro encontrado',
        totalMessage: 'total(is)',
        selectedMessage: 'selecionado(s)'
    },
    cssClasses: {
        sortAscending: 'pi pi-sort-up',
        sortDescending: 'pi pi-sort-down',
        sortUnset: '',
        pagerLeftArrow: 'pi pi-arrow-left',
        pagerRightArrow: 'pi pi-arrow-right',
        pagerPrevious: 'pi pi-angle-double-left',
        pagerNext: 'pi pi-angle-double-right'
    }
    // headerHeight: 50,
    // footerHeight: 50,
    // rowHeight: 50,
    // defaultColumnWidth: 50
};

@NgModule({
    imports: [CommonModule, NgxDatatableModule.forRoot(dataTableConfig), MaskPipe, NormalizeStringPipe],
    declarations: [],
    exports: [MaterialModule, NormalizeStringPipe, MaskPipe, PopoverModule],
    providers: [
        // { provide: CdkTableModule, useValue: CdkTableModule },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: HttpsRequestInterceptor,
        //   multi: true,
        // },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class SharedModule {}
