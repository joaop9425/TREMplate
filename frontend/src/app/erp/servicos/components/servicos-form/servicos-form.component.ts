import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseDialogFormComponent } from '../../../../shared/components/base-form';
import { SharedModule } from '../../../../shared/shared.module';
import { ServicosService } from '../../../services/servicos.service';
import { Servico } from '../../interface/servico.interface';

@Component({
    selector: 'app-servicos-form',
    imports: [SharedModule, ReactiveFormsModule, CommonModule],
    template: `
        <mat-card class="card">
            <h2 mat-dialog-title>Serviço</h2>

            <mat-dialog-content *ngIf="form" [formGroup]="form" class="form-container">
                <mat-form-field>
                    <mat-label>nome</mat-label>
                    <input matInput formControlName="nome" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>descricao</mat-label>
                    <input matInput formControlName="descricao" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>valor</mat-label>
                    <input matInput formControlName="valor" />
                </mat-form-field>
            </mat-dialog-content>

            <mat-dialog-actions align="end">
                <button mat-button (click)="close()">Cancelar</button>
                <button mat-raised-button color="primary" (click)="save()" [disabled]="!form.valid">Salvar</button>
            </mat-dialog-actions>
        </mat-card>
    `,
    styles: [
        `
            mat-card.card {
                margin: 0 auto;
                min-width: 500px;
                width: 100%;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                background-color: #f5f5f5;
            }

            mat-form-field {
                width: 100%;
            }
        `
    ]
})
export class ServicosFormComponent extends BaseDialogFormComponent<Servico, ServicosService> {
    override fb = inject(FormBuilder);

    constructor(service: ServicosService) {
        super(service);
    }

    protected override buildForm(entity?: Servico | null | undefined): FormGroup {
        return this.fb.group({
            nome: [entity?.nome || '', Validators.required],
            descricao: [entity?.descricao || '', Validators.required],
            valor: [entity?.valor || '', Validators.required]
        });
    }

    protected override prepareSaveData(formValue: any): Partial<Servico> {
        return {
            nome: formValue?.nome || '',
            descricao: formValue?.descricao || '',
            valor: formValue?.valor || ''
        };
    }
}
