import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnderecoService } from '../../erp/services/endereco.service';
import { SharedModule } from '../shared.module';

@Component({
    selector: 'app-endereco-form',
    standalone: true,
    imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
    template: `
        <form [formGroup]="form">
            <mat-divider></mat-divider>
            <h3 mat-dialog-title>Endereço</h3>

            <mat-form-field>
                <mat-label>CEP</mat-label>
                <input matInput formControlName="zipCode" mask="00000-000" (blur)="buscarCep()" />
            </mat-form-field>

            <mat-form-field>
                <mat-label>Rua</mat-label>
                <input matInput formControlName="street" />
            </mat-form-field>

            <mat-form-field>
                <mat-label>Número</mat-label>
                <input matInput formControlName="localNumber" />
            </mat-form-field>

            <mat-form-field>
                <mat-label>Bairro</mat-label>
                <input matInput formControlName="neighbourhood" />
            </mat-form-field>

            <mat-form-field>
                <mat-label>Referência</mat-label>
                <input matInput formControlName="reference" />
            </mat-form-field>

            <mat-form-field>
                <mat-label>Estado</mat-label>
                <mat-select formControlName="stateId">
                    <mat-option *ngFor="let estado of estados" [value]="estado.id">
                        {{ estado.name }}
                    </mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Cidade</mat-label>
                <mat-select formControlName="cityId">
                    <mat-option *ngFor="let cidade of cidades" [value]="cidade.id">
                        {{ cidade.name }}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </form>
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
export class EnderecoFormComponent {
    @Input() form!: FormGroup;
    @Input() estados: any[] = [];
    cidades: any[] = [];

    constructor(private service: EnderecoService) {}

    // RESPOSTA DA BUSCA:
    // {
    //     "cep": "38073-058",
    //     "logradouro": "Rua Joaquim Marcílio Leal",
    //     "complemento": "",
    //     "unidade": "",
    //     "bairro": "Antônia Cândida I",
    //     "localidade": "Uberaba",
    //     "uf": "MG",
    //     "estado": "Minas Gerais",
    //     "regiao": "Sudeste",
    //     "ibge": "3170107",
    //     "gia": "",
    //     "ddd": "34",
    //     "siafi": "5401"
    // }
    // buscarCep() {
    //     let cep = this.form.get('zipCode')?.value;
    //     cep = cep?.replace(/\D/g, '');
    //     if (cep?.length === 8) {
    //         this.service.buscarCep(cep).subscribe((res: any) => {
    //             if (!res.erro) {
    //                 this.form.patchValue({
    //                     street: res.logradouro,
    //                     reference: res.complemento
    //                 });
    //             }
    //         });
    //     }
    // }

    buscarCep() {
        let cep = this.form.get('zipCode')?.value;
        cep = cep?.replace(/\D/g, '');
        if (cep?.length === 8) {
            this.service.buscarCep(cep).subscribe((res: any) => {
                if (!res.erro) {
                    this.form.patchValue({
                        street: res.logradouro,
                        reference: res.complemento,
                        neighbourhood: res.bairro
                        // stateId: res.uf
                    });
                }
            });
        }
    }

    ngOnInit() {
        this.form.get('stateId')?.valueChanges.subscribe((estadoId: string) => {
            if (estadoId) {
                this.service.buscarCidadesPorEstado(estadoId).subscribe((cidades: any[]) => {
                    this.cidades = cidades;
                    // limpa a cidade selecionada anterior
                    this.form.get('cityId')?.setValue(null);
                });
            } else {
                this.cidades = [];
                this.form.get('cityId')?.setValue(null);
            }
        });
    }
}
