import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDataService } from '../services/base-data.service';

@Component({
    selector: 'app-base-dialog-form',
    template: '',
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
export abstract class BaseDialogFormComponent<T extends { id?: number | string }, S extends BaseDataService<T, any>> implements OnInit {
    form!: FormGroup;
    isEditMode = false;
    entityId: number | string | null = null;
    initialData: T | null = null;

    // Injeção de dependências comuns
    protected dialogRef = inject(MatDialogRef<BaseDialogFormComponent<T, S>>);
    protected data: { item: T } | null = inject(MAT_DIALOG_DATA, { optional: true });
    protected fb = inject(FormBuilder);

    protected service: S;

    constructor(@Inject('') serviceInstance: S) {
        this.service = serviceInstance;
    }

    ngOnInit(): void {
        this.initialData = this.data?.item || null;
        this.isEditMode = !!this.initialData?.id;
        this.entityId = this.initialData?.id || null;
        this.form = this.buildForm(this.initialData);
        this.loadAuxiliaryData();
    }

    /**
     * Método abstrato para construir o FormGroup.
     * Deve ser implementado pela classe filha.
     * @param entity Dados iniciais para preencher o formulário (modo edição).
     */
    protected abstract buildForm(entity?: T | null): FormGroup;

    /**
     * Método abstrato para preparar os dados do formulário para salvar.
     * Deve ser implementado pela classe filha.
     * @param formValue Valor atual do FormGroup.
     */
    protected abstract prepareSaveData(formValue: any): Partial<T>;

    /**
     * Método opcional para carregar dados auxiliares (ex: dropdowns).
     * Pode ser sobrescrito pela classe filha se necessário.
     */
    protected loadAuxiliaryData(): void {
        // Implementação padrão vazia
    }

    /**
     * Salva os dados (cria ou atualiza).
     */
    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched(); // Marcar campos como tocados para exibir erros
            // Opcional: Adicionar notificação de erro para o usuário
            console.error('Formulário inválido:', this.form.errors);
            return;
        }

        const saveData = this.prepareSaveData(this.form.value);
        console.log('this.form.value:', this.form.value);
        console.log('Dados a serem salvos:', saveData);

        if (this.isEditMode && this.entityId) {
            this.service.update(this.entityId, saveData).subscribe({
                next: () => this.close(true),
                error: (err) => this.handleSaveError(err) // Opcional: Tratamento de erro
            });
        } else {
            this.service.create(saveData).subscribe({
                next: () => this.close(true),
                error: (err) => this.handleSaveError(err) // Opcional: Tratamento de erro
            });
        }
    }

    /**
     * Fecha o diálogo.
     * @param updated Indica se os dados foram atualizados (para recarregar a lista, por exemplo).
     */
    close(updated: boolean = false): void {
        this.dialogRef.close({ updated });
    }

    /**
     * Manipulador de erro opcional para a operação de salvar.
     * @param error O erro ocorrido.
     */
    protected handleSaveError(error: any): void {
        console.error('Erro ao salvar:', error);
        // Opcional: Adicionar notificação de erro para o usuário (ex: Snackbar)
    }
}
