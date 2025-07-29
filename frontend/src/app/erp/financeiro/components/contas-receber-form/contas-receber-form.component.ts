import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinanceiroService } from '../../../services/financeiro.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
    selector: 'app-contas-receber-form',
    standalone: true,
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    template: `
        <mat-card class="card">
            <h2 mat-dialog-title>Contas a Receber</h2>

            <mat-dialog-content [formGroup]="form">
                <mat-form-field>
                    <input matInput placeholder="Descrição" formControlName="descricao" [value]="descricao()" />
                </mat-form-field>

                <mat-divider></mat-divider>

                <mat-form-field>
                    <input matInput placeholder="Valor" formControlName="valor" [value]="valor()" />
                </mat-form-field>

                <mat-divider></mat-divider>

                <mat-form-field>
                    <input matInput placeholder="Vencimento" formControlName="vencimento" [value]="vencimento()" />
                </mat-form-field>

                <mat-divider></mat-divider>

                <mat-form-field>
                    <select matNativeControl name="status" id="status" formControlName="status">
                        <option value="pendente">Pendente</option>
                        <option value="recebido">Recebido</option>
                    </select>
                </mat-form-field>
            </mat-dialog-content>

            <mat-dialog-actions>
                <button mat-button class="mat-raised-button" (click)="close()">Fechar</button>
                <button mat-button class="mat-raised-button mat-primary" (click)="save()" [disabled]="!form.valid">Salvar</button>
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
export class ContasReceberFormComponent {
    readonly descricao = signal('');
    readonly valor = signal('');
    readonly vencimento = signal('');
    readonly status = signal('');

    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<ContasReceberFormComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private service: FinanceiroService,
        private fb: FormBuilder
    ) {
        console.log('data se existir -> ', this.data);
        const contasReceber = this.data?.contasReceber || this.initializeContasReceber();

        this.form = this.fb.group({
            id: [contasReceber.id],
            descricao: [contasReceber.descricao],
            valor: [contasReceber.valor],
            vencimento: [contasReceber.vencimento],
            status: [contasReceber.status]
        });
    }

    private initializeContasReceber() {
        return {
            descricao: '',
            valor: 0,
            vencimento: '',
            status: 'pendente'
        };
    }

    save(): void {
        this.service.createContasReceber(this.form.value).subscribe((res) => {
            console.log('create -> ', res);
        });
        this.close();
    }

    close() {
        this.dialogRef.close({ updated: true });
    }
}
