import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseDialogFormComponent } from '../../../../shared/components/base-form';
import { SharedModule } from '../../../../shared/shared.module';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../interface/produto.interface';

@Component({
    selector: 'app-produtos-form',
    imports: [SharedModule, ReactiveFormsModule, CommonModule],
    template: `
        <mat-card class="card">
            <h2 mat-dialog-title>Produto</h2>

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
                    <mat-label>preco</mat-label>
                    <input matInput formControlName="preco" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>tipo</mat-label>
                    <input matInput formControlName="tipo" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>estoque</mat-label>
                    <input matInput formControlName="estoque" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>marca</mat-label>
                    <input matInput formControlName="marca" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>modelo</mat-label>
                    <input matInput formControlName="modelo" />
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
export class ProdutosFormComponent extends BaseDialogFormComponent<Produto, ProdutosService> {
    override fb = inject(FormBuilder);

    constructor(service: ProdutosService) {
        super(service);
    }

    protected override buildForm(entity?: Produto | null | undefined): FormGroup {
        return this.fb.group({
            nome: [entity?.nome || '', Validators.required],
            descricao: [entity?.descricao || '', Validators.required],
            preco: [entity?.preco || '', Validators.required],
            tipo: [entity?.tipo || '', Validators.required],
            estoque: [entity?.estoque || '', Validators.required],
            marca: [entity?.marca || '', Validators.required],
            modelo: [entity?.modelo || '', Validators.required]
        });
    }

    protected override prepareSaveData(formValue: any): Partial<Produto> {
        return {
            nome: formValue?.nome || '',
            descricao: formValue?.descricao || '',
            preco: formValue?.preco || '',
            tipo: formValue?.tipo || '',
            estoque: formValue?.estoque || '',
            marca: formValue?.marca || '',
            modelo: formValue?.modelo || ''
        };
    }
}
