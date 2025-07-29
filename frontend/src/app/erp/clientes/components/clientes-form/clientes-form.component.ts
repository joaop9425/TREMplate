import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseDialogFormComponent } from '../../../../shared/components/base-form';
import { EnderecoFormComponent } from '../../../../shared/components/endereco';
import { SharedModule } from '../../../../shared/shared.module';
import { ClientesService } from '../../../services/clientes.service';
import { EnderecoService } from '../../../services/endereco.service';
import { Cliente } from '../../cliente.interface';

@Component({
    selector: 'app-clientes-form',
    standalone: true,
    imports: [SharedModule, FormsModule, ReactiveFormsModule, EnderecoFormComponent],
    templateUrl: './clientes-form.component.html'
})
export class ClientesFormComponent extends BaseDialogFormComponent<Cliente, ClientesService> {
    clientes: Partial<Cliente>[] = [];
    estados: any[] = [];

    constructor(
        service: ClientesService,
        private enderecoService: EnderecoService
    ) {
        super(service); // Passar a instância do serviço para a classe base
        this.form = this.buildForm(); // Inicializar o formulário
        this.loadStates();
    }

    private loadStates() {
        this.enderecoService.getEstados().subscribe((res) => {
            this.estados = res;
        });
    }

    /**
     * Implementação da construção do formulário específico para Contrato.
     */
    protected override buildForm(cliente?: Cliente | null): FormGroup {
        return (this.form = this.fb.group({
            id: [cliente?.id || null],
            nome: [cliente?.nome || '', Validators.required],
            cpfCnpj: [cliente?.cpfCnpj || '', Validators.required],
            telefone: [cliente?.telefone || '', Validators.required],
            email: [cliente?.email || '', Validators.email],

            zipCode: [cliente?.endereco?.zipCode || ''],
            street: [cliente?.endereco?.street || ''],
            neighbourhood: [cliente?.endereco?.neighbourhood || ''],
            localNumber: [cliente?.endereco?.localNumber || ''],
            reference: [cliente?.endereco?.reference || ''],
            cityId: [cliente?.endereco?.cityId || null],
            stateId: [cliente?.endereco?.stateId || null]
        }));
    }

    /**
     * Implementação da preparação dos dados para salvar.
     */
    protected override prepareSaveData(formValue: any): Partial<Cliente> {
        return {
            id: formValue.id || null,
            nome: formValue.nome || '',
            cpfCnpj: formValue.cpfCnpj || '',
            telefone: formValue.telefone || '',
            email: formValue.email || '',
            endereco: {
                zipCode: formValue.zipCode || '',
                street: formValue.street || '',
                localNumber: formValue.localNumber || '',
                reference: formValue.reference || '',
                cityId: formValue.cityId || ''
            }
        };
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }
}
