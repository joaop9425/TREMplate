import { ComponentType } from '@angular/cdk/portal';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SharedModule } from '../shared.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [SharedModule],
    template: `
        <mat-card>
            <mat-card-header>
                <mat-card-title>{{ titlePage }}</mat-card-title>
                <mat-card-subtitle>{{ subTitlePage }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
                <button mat-raised-button color="primary" (click)="openDialog()">Novo</button>
                <mat-divider></mat-divider>
                <input type="text" matInput (keyup)="updateFilter($event)" placeholder="Buscar" name="buscar" />
            </mat-card-content>
        </mat-card>
        <mat-divider></mat-divider>
    `
})
export class FilterComponent {
    readonly dialog = inject(MatDialog);

    @Input()
    titlePage = '';

    @Input()
    subTitlePage = '';

    @Input()
    formComponent!: ComponentType<unknown>;

    @Output()
    filter = new EventEmitter<unknown>();

    updateFilter(event: any) {
        const val = event.target.value;
        this.filter.emit({ [event.target.name]: val });
        // console.log('valor procurado no filtro -> ', { [event.target.name]: val });
    }

    openDialog() {
        const dialogRef = this.dialog.open(this.formComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result?.updated) {
                this.filter.emit({ updated: true });
            }
        });
    }
}
