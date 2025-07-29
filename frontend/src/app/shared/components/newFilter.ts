import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';

@Component({
    selector: 'app-generic-filter',
    imports: [SharedModule, CommonModule, FormsModule],
    template: `
        <div class="filter-container">
            <h1>{{ titlePage }}</h1>
            <h2 *ngIf="subTitlePage">{{ subTitlePage }}</h2>

            <div class="filter-actions">
                <mat-form-field>
                    <input matInput placeholder="Buscar" [(ngModel)]="filterValue" (keyup)="onFilterChange()" />
                </mat-form-field>

                <button mat-button (click)="openForm()">Novo</button>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class GenericFilterComponent {
    @Input() titlePage = '';
    @Input() subTitlePage = '';
    @Input() formComponent: any;
    @Input() formData: any = {};
    @Output() filter = new EventEmitter<any>();

    filterValue = '';

    constructor(private dialog: MatDialog) {}

    onFilterChange(): void {
        this.filter.emit({ buscar: this.filterValue });
    }

    openForm(): void {
        const dialogRef = this.dialog.open(this.formComponent, {
            data: this.formData
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result?.updated) {
                this.filter.emit({ updated: true });
            }
        });
    }
}
