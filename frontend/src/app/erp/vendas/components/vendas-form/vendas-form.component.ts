import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSelectComponent } from '../../../../shared/components/autocomplete';
import { BaseDialogFormComponent } from '../../../../shared/components/base-form';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '../../../../shared/shared.module';
import { Cliente } from '../../../clientes/cliente.interface';
import { ClientesService } from '../../../services/clientes.service';
import { VendasService } from '../../../services/vendas.service';
import { Venda } from '../../interface/venda.interface';
import { Produto } from '../../../produtos/interface/produto.interface';
import { ProdutosService } from '../../../services/produtos.service';

@Component({
    selector: 'app-vendas-form',
    imports: [SharedModule, ReactiveFormsModule, CommonModule, MultiSelectModule, InputSelectComponent],
    template: `
        <mat-card class="card">
            <h2 mat-dialog-title>Venda</h2>

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
                    <mat-label>data</mat-label>
                    <input matInput type="date" formControlName="data" />
                </mat-form-field>

                <mat-form-field>
                    <mat-label>valorTotal</mat-label>
                    <input matInput formControlName="valorTotal" />
                </mat-form-field>

                <p-multiSelect formControlName="produtos" [options]="produtos" optionLabel="nome" optionValue="id" placeholder="Selecione os produtos" display="chip" [filter]="true" styleClass="w-full md:w-80"></p-multiSelect>
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
                height: 700px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                background-color: #f5f5f5;
            }

            mat-form-field {
                width: 100%;
            }

            p-multiSelect {
                width: 100%;
                height: 100px;
            }
        `
    ]
})
export class VendasFormComponent extends BaseDialogFormComponent<Venda, VendasService> {
    clientes: Partial<Cliente>[] = [];
    produtos: Produto[] = [];

    override fb = inject(FormBuilder);

    constructor(
        service: VendasService,
        private readonly clientesService: ClientesService,
        private readonly produtoService: ProdutosService
    ) {
        super(service);
    }

    protected override buildForm(entity?: Venda | null): FormGroup {
        return this.fb.group({
            cliente: [entity?.cliente || '', Validators.required],
            data: [entity?.data || '', Validators.required],
            valorTotal: [entity?.valorTotal || '', Validators.required],
            produtos: [entity?.produtos || [], Validators.required]
        });
    }

    protected override prepareSaveData(formValue: any): Partial<Venda> {
        return {
            cliente: {
                id: formValue?.cliente?.id || null
            },
            data: formValue?.data || '',
            valorTotal: formValue?.valorTotal || '',
            produtos: formValue?.produtos || []
        };
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.loadClientes();
        this.loadProdutos();
    }

    loadClientes() {
        this.clientesService.getAll().subscribe((response: { items: Cliente[]; count: number }) => {
            this.clientes = response.items.map((cliente) => ({
                id: cliente.id,
                nome: cliente.nome
            }));
        });
    }

    loadProdutos() {
        this.produtoService.getAll().subscribe((res: { items: Produto[]; count: number }) => {
            this.produtos = res.items;
        });
    }

    onClienteSelecionado(cliente: Cliente) {
        this.form?.patchValue({ cliente });
    }

    onProdutosSelecionados(produtosSelecionados: Produto[]) {
        this.form?.patchValue({ produtos: produtosSelecionados });
    }
}
