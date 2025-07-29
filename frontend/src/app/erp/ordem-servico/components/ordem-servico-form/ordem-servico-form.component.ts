import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSelectComponent } from '../../../../shared/components/autocomplete';
import { BaseDialogFormComponent } from '../../../../shared/components/base-form';
import { SharedModule } from '../../../../shared/shared.module';
import { OrdemServicoService } from '../../../services/ordem-servico.service';
import { OrdemServico } from '../../interface/ordem-servico.interface';
import { Cliente } from '../../../clientes/cliente.interface';
import { ClientesService } from '../../../services/clientes.service';

@Component({
    selector: 'app-ordem-servico-form',
    imports: [SharedModule, ReactiveFormsModule, CommonModule, InputSelectComponent],
    template: `
        <mat-card class="card">
            <h2 mat-dialog-title>Ordem de Serviço</h2>

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
                    <input matInput type="datetime-local" formControlName="dataAbertura" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>dataFim</mat-label>
                    <input matInput type="datetime-local" formControlName="dataFechamento" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>Preço Total</mat-label>
                    <input matInput formControlName="valorTotal" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>Descrição do Problema</mat-label>
                    <input matInput formControlName="descricaoProblema" />
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
export class OrdemServicoFormComponent extends BaseDialogFormComponent<OrdemServico, OrdemServicoService> {
    clientes: Partial<Cliente>[] = [];
    override fb = inject(FormBuilder);

    constructor(
        service: OrdemServicoService,
        private readonly clientesService: ClientesService
    ) {
        super(service);
    }

    protected override buildForm(entity?: OrdemServico | null): FormGroup {
        return this.fb.group({
            cliente: [entity?.cliente || '', Validators.required],
            dataAbertura: [entity?.dataAbertura || null, Validators.required],
            dataFechamento: [entity?.dataFechamento || null, Validators.required],
            status: [entity?.status || null, Validators.required],
            descricaoProblema: [entity?.descricaoProblema || null, Validators.required],
            valorTotal: [entity?.valorTotal || null, Validators.required]
        });
    }

    protected override prepareSaveData(formValue: any): Partial<OrdemServico> {
        return {
            cliente: {
                id: formValue?.cliente?.id || null
            },
            dataAbertura: formValue?.dataAbertura || '',
            dataFechamento: formValue?.dataFechamento || '',
            status: formValue?.status || '',
            descricaoProblema: formValue?.descricaoProblema || '',
            valorTotal: formValue?.valorTotal || ''
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
