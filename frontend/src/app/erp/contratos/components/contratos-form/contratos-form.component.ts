import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSelectComponent } from '../../../../shared/components/autocomplete';
import { BaseDialogFormComponent } from '../../../../shared/components/base-form';
import { SharedModule } from '../../../../shared/shared.module';
import { Cliente } from '../../../clientes/cliente.interface';
import { ContratosService } from '../../../services/contrato.service';
import { Contrato } from '../../interface/contrato.interface';
import { ClientesService } from '../../../services/clientes.service';

@Component({
    selector: 'app-contratos-form',
    standalone: true,
    imports: [SharedModule, ReactiveFormsModule, CommonModule, InputSelectComponent],
    template: `
        <mat-card class="card">
            <h2 mat-dialog-title>Contratos</h2>

            <mat-dialog-content *ngIf="form" [formGroup]="form" class="form-container">
                <app-input-select
                    formControlName="cliente"
                    [label]="'Nome do Cliente'"
                    [options]="clientes"
                    [optionLabel]="'nome'"
                    [optionValue]="'id'"
                    [placeholder]="'Digite ou selecione o cliente'"
                    (optionSelected)="onClienteSelecionado($event)"
                ></app-input-select>

                <mat-form-field>
                    <mat-label>dataInicio</mat-label>
                    <input matInput type="date" formControlName="dataInicio" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>dataFim</mat-label>
                    <input matInput type="date" formControlName="dataFim" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>valorMensal</mat-label>
                    <input matInput formControlName="valorMensal" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>Descrição</mat-label>
                    <input matInput formControlName="descricao" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>status</mat-label>
                    <mat-select formControlName="status">
                        <mat-option value="ativo">Ativo</mat-option>
                        <mat-option value="inativo">Inativo</mat-option>
                    </mat-select>
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
export class ContratosFormComponent extends BaseDialogFormComponent<Contrato, ContratosService> {
    clientes: Partial<Cliente>[] = [];
    constructor(
        contratoService: ContratosService,
        private readonly clientesService: ClientesService
    ) {
        super(contratoService); // Passar a instância do serviço para a classe base
        this.form = this.buildForm(); // Inicializar o formulário
    }

    /**
     * Implementação da construção do formulário específico para Contrato.
     */
    protected override buildForm(contrato?: Contrato | null): FormGroup {
        return this.fb.group({
            // id é gerenciado pela classe base, não precisa estar no form explicitamente
            cliente: [contrato?.cliente || '', Validators.required],
            descricao: [contrato?.descricao || '', Validators.required],
            dataInicio: [contrato?.dataInicio || '', Validators.required],
            dataFim: [contrato?.dataFim || '', Validators.required],
            valorMensal: [contrato?.valorMensal || '', Validators.required],
            status: [contrato?.status || 'ativo', Validators.required]
        });
    }

    /**
     * Implementação da preparação dos dados para salvar.
     */
    protected override prepareSaveData(formValue: any): Partial<Contrato> {
        return {
            cliente: {
                id: formValue?.cliente?.id || null
            },
            descricao: formValue?.descricao || '',
            dataInicio: formValue?.dataInicio || '',
            dataFim: formValue?.dataFim || '',
            valorMensal: formValue?.valorMensal || '',
            status: formValue?.status || ''
        };
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.loadClientes();
    }

    loadClientes() {
        this.clientesService.getAll().subscribe((response: { items: Cliente[]; count: number }) => {
            this.clientes = response.items.map((cliente) => ({
                id: cliente.id,
                nome: cliente.nome
            }));
        });
    }

    onClienteSelecionado(cliente: Cliente) {
        this.form?.patchValue({ cliente });
    }
}
